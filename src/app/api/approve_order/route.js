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

        const orderDetails = await request.json()

        const newDBData = {
            $set: { orderDetails: orderDetails }
        }
        await db.collection('orders').updateOne(
            { UUID: orderDetails.purchase_units[0].invoice_id },
            newDBData
        )

        return NextResponse.json({
            code: 200
        })

    } catch (err) {
        console.log(err)
        return Response.json({ code: 204 })
    }
}