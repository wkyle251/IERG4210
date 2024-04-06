import { NextRequest, NextResponse } from "next/server";
import { sign, verify } from "jsonwebtoken"
import { cookies } from 'next/headers'
import fs from "fs"
import key from "../../../private"
import db from '@/db_connection'

export async function POST() {

  const privateKey = fs.readFileSync(`${key.privateKeyFile}decrypted_private_key.pem`);
  const publicKey = fs.readFileSync(`${key.privateKeyFile}public_key.pem`);
  // verify cookies
  const cookieStore = cookies()
  const token = cookieStore.get('auth')
  const tokenInfo = verify(token.value, publicKey)
  if (!token)
    return Response.json({ code: 205 })
  const query = {}
  if (tokenInfo.role != 'admin')
    query.username = tokenInfo.username

  const res = await db.collection('orders').find(query).sort({ "_id": -1 })
  const res2 = await res.toArray()
  return Response.json(res2)
}
