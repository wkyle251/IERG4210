import db from '@/db_connection'
import { v4 as uuidv4 } from 'uuid'
import uploadS3 from '@/s3'
export async function POST (request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')
    const name = formData.get('name')
    const price = formData.get('price')
    const quantity = formData.get('quantity')
    const description = formData.get('description')
    const newCategory = formData.get('newCategory')
    var categories = formData.get('categories')
    var pid = formData.get('pid')
    if (pid == "null")
      pid = uuidv4()
    const isEdit = formData.get('edit')
    if (categories == -1) {
      const res = await db.collection('categories').find({}).sort({ cid: -1 })
      const array = await res.toArray()
      categories = array[0].cid + 1
      await db
        .collection('categories')
        .insertOne({ cid: categories, name: newCategory })
    }

    const input = {
      name: name,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      description: description,
      categories: parseInt(categories),
      pid: pid,
      date: new Date()
    }
    if (file && typeof file == 'object') {
      input.filename = `${uuidv4()}${file.name}`
      await uploadS3(file, input.filename)
    }
    const products = db.collection('products')
    if (isEdit == "true") {
      var newvalues = { $set: input }
      await products.updateOne({ pid: pid }, newvalues)
    } else {
      await products.insertOne(input)
    }

    return Response.json({ code: 200, msg: 'success' })
  } catch (err) {
    return Response.json({ code: 300, msg: err })
  }
}
