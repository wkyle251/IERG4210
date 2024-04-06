import { NextRequest, NextResponse } from "next/server";
import { sign, verify } from "jsonwebtoken"
import { cookies } from 'next/headers'
import fs from "fs"
import key from "../../../private"
import db from '@/db_connection'
import { ObjectId } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'

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

        const { shoppingCart, invoice_id } = await request.json()
        const query = {
            "$or": shoppingCart.map(e => ({ _id: new ObjectId(e._id) }))
        }
        const searchQuery = await db.collection('products').find(query)
        const res = await searchQuery.toArray()

        const validateCart = shoppingCart.filter(e => res.find(val => val.pid == e.pid))

        const amount = validateCart.reduce((y, x) => x.price * x.num + y, 0)

        const orderDetails = {
            purchase_units: [{
                amount: {
                    value: amount, // Transaction amount
                    currency_code: "USD",
                    breakdown: {
                        item_total: {
                            value: amount,
                            currency_code: "USD",
                        }
                    }
                },
                items: validateCart.map(item => ({
                    name: item.name,
                    quantity: item.num,
                    unit_amount: {
                        currency_code: "USD",
                        value: item.price
                    }
                })),
                invoice_id: invoice_id
            }],
            payer: {
                email_adddress: tokenInfo.username
            }
        }

        const salt = uuidv4()
        const msgUint8 = new TextEncoder().encode(JSON.stringify(orderDetails) + salt); // encode as (utf-8) Uint8Array
        const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
        const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
        const custom_id = hashArray
            .map((b) => b.toString(16).padStart(2, "0"))
            .join(""); // convert bytes to hex string

        orderDetails.purchase_units[0].custom_id = custom_id

        const newDBData = {
            UUID: invoice_id,
            username: tokenInfo.username,
            digest: custom_id,
            salt: salt,
            products: query,
        }
        await db.collection('orders').insertOne(newDBData)
        await db.collection('products').updateMany(query, { $inc: { quantity: -1 } })

        return NextResponse.json({
            code: 200,
            orderDetails: orderDetails
        })

    } catch (err) {
        console.log(err)
        return Response.json({ code: 204 })
    }
}