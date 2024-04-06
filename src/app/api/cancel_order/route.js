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
        if (!token)
            return Response.json({ code: 205 })

        const { invoice_id } = await request.json()

        const { products } = await db.collection('orders').findOne({ UUID: invoice_id })
        await db.collection('products').updateMany(products, { $inc: { quantity: +1 } })
        await db.collection('orders').deleteOne({ UUID: invoice_id })

        return NextResponse.json({
            code: 200,
        })

    } catch (err) {
        console.log(err)
        return Response.json({ code: 204 })
    }
}