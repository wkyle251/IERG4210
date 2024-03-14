import { NextRequest, NextResponse } from "next/server";
import { sign, verify } from "jsonwebtoken"
import fs from "fs"
import key from "../../../private"
import db from '@/db_connection'

export async function POST(request) {
    try {
        const privateKey = fs.readFileSync(`${key.privateKeyFile}decrypted_private_key.pem`);
        const publicKey = fs.readFileSync(`${key.privateKeyFile}public_key.pem`);
        const { username, password } = await request.json()
        const user = await db.collection('users').findOne({ username: username })

        if (!user)
            throw new Error('User not found');

        const checkPass = verify(user.password, publicKey)

        if (checkPass != password)
            throw new Error('User not found');

        const userData = {
            username: username,
            role: user.role,
        }
        const token = sign(userData, privateKey, { algorithm: 'RS256' });
        const response = NextResponse.json({ code: 200 })
        response.cookies.set("auth", token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 3, // 3 days
            secure: true,
        })
        return response
    } catch (err) {
        return Response.json({ code: 204 })
    }
}