import db from '@/db_connection'
import { v4 as uuidv4 } from 'uuid'

export async function POST (request) {
  const formData = await request.formData()
  const pid = formData.get('pid') 
  const products = db.collection('products')
  var myquery = { pid: pid };
  products.deleteOne(myquery)

  return Response.json({})
}
