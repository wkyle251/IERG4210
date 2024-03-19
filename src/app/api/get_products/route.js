import db from '@/db_connection'
export async function POST () {
  const categories = db.collection('products')
  const res = await categories.find({}).sort( { "_id": -1 } )
  const res2 = await res.toArray()
  return Response.json(res2)
}
