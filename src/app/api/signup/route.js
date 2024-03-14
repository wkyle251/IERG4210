import { NextRequest, NextResponse } from "next/server";
import { sign, verify } from "jsonwebtoken"
import fs from "fs"
import key from "../../../private"
import db from '@/db_connection'

export async function POST(request) {
    try {
        const privateKey = fs.readFileSync(`${key.privateKeyFile}decrypted_private_key.pem`);
        const publicKey = fs.readFileSync(`${key.privateKeyFile}public_key.pem`);
        const { username, password, verifyPassword, isAdmin } = await request.json()
        if (password != verifyPassword)
            return Response.json({ code: 205 })

        const user = await db.collection('users').findOne({ username: username })

        if (user)
            return Response.json({ code: 203 })

        const hashPass = sign(password, privateKey, { algorithm: 'RS256' });
        await db.collection('users').insertOne({
            username: username,
            password: hashPass,
            role: isAdmin ? 'admin' : 'user',
        })

        const response = NextResponse.json({ code: 200 })
        response.cookies.set("auth", "", {
            httpOnly: true,
            maxAge: -1, // 1 hour
            secure: true,
        })
        return response
    } catch (err) {
        console.log(err)
        return Response.json({ code: 204 })
    }
}