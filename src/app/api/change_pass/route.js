import { NextRequest, NextResponse } from "next/server";
import { sign, verify } from "jsonwebtoken"
import fs from "fs"
import key from "../../../private"
import db from '@/db_connection'

export async function POST(request) {
    try {
        const privateKey = fs.readFileSync(`${key.privateKeyFile}decrypted_private_key.pem`);
        const publicKey = fs.readFileSync(`${key.privateKeyFile}public_key.pem`);
        const { username, password, newPassword, verifyPassword } = await request.json()

        if (newPassword != verifyPassword)
            return Response.json({ code: 205 })

        const user = await db.collection('users').findOne({ username: username })

        if (!user)
            throw new Error('User not found');

        const checkPass = verify(user.password, publicKey)

        if (checkPass != password)
            return Response.json({ code: 203 })

        const hashPass = sign(newPassword, privateKey, { algorithm: 'RS256' });
        await db.collection('users').updateOne({ username: username },
            {
                $set: { password: hashPass }
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