import db from '@/db_connection'

export async function POST (request) {
  const data = await request.json()
  var myquery = { cid: parseInt(data.categories) }
  await db.collection('categories').deleteOne(myquery)

  return Response.json({code:200})
}
