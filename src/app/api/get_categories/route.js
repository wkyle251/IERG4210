import db from '@/db_connection'
export async function POST () {
  const categories = db.collection('categories')
  const res = await categories.find({})
  const res2 = await res.toArray()
  return Response.json(res2)
}
