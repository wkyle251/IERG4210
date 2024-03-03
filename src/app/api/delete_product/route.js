import db from '@/db_connection'

export async function POST (request) {
  const formData = await request.formData()
  const pid = formData.get('pid') 
  const products = db.collection('products')
  var myquery = { pid: pid };
  products.deleteOne(myquery)

  return Response.json({code:200})
}
