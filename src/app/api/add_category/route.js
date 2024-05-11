import { NextRequest, NextResponse } from "next/server";
import { sign, verify } from "jsonwebtoken"
import { cookies } from 'next/headers'
import fs from "fs"
import key from "../../../private"
import db from '@/db_connection'

export async function POST(request) {
  try {

    const privateKey = fs.readFileSync(`${key.privateKeyFile}decrypted_private_key.pem`);
    const publicKey = fs.readFileSync(`${key.privateKeyFile}public_key.pem`);

    // verify cookies
    const cookieStore = cookies()
    const token = cookieStore.get('auth')
    const tokenInfo = verify(token.value, publicKey)
    if (!token || tokenInfo?.role != 'admin')
      return Response.json({ code: 205 })


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
  } catch (err) {
    console.log(err)
    return Response.json({ code: 204 })
  }
}
