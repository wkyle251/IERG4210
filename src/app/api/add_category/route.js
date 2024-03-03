import db from '@/db_connection'

export async function POST (request) {
  const data = await request.json()
  if (data.categories == -1) {
    const res = await db.collection('categories').find({}).sort({ cid: -1 })
    const array = await res.toArray()
    const categories = array[0].cid + 1
    await db
      .collection('categories')
      .insertOne({ cid: categories, name: data.newCategory })
  } else {
    await db.collection('categories').updateOne(
      { cid: parseInt(data.categories) },
      {
        $set: { name: data.newCategory }
      }
    )
  }

  return Response.json({ code: 200 })
}
