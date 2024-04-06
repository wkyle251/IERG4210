'use server'
import React, { Suspense } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import fs from "fs"
import key from '@/private'
import { sign, verify } from "jsonwebtoken"
import UserPage from './UserPage'

const Panel = ({ }) => {
    const cookieStore = cookies()
    const token = cookieStore.get('auth')

    var tokenInfo = {
        username: "Guest",
        role: "guest"
    }

    if (token) {
        const publicKey = fs.readFileSync(`${key.privateKeyFile}public_key.pem`);
        tokenInfo = verify(token.value, publicKey)
        if (tokenInfo?.role == "user")
            return <UserPage tokenInfo={tokenInfo}/>
    }
    redirect('/')

}
export default async () => (
    <Suspense>
        <Panel />
    </Suspense>
)
