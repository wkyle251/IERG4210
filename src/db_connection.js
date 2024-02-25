import { MongoClient } from 'mongodb'
import key from './private'
const client = new MongoClient(
  key.mongoUrl
)
await client.connect()
const db = client.db('main')
export default db