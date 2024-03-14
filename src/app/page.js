'use server'
import MainPage from '../component/Main/MainPage'
import { Suspense } from 'react'
import { cookies } from 'next/headers'
import fs from "fs"
import key from '@/private'
import { sign, verify } from "jsonwebtoken"

export default async () => {
  const cookieStore = cookies()
  const token = cookieStore.get('auth')
  var tokenInfo = {
    username: "Guest",
    role: "guest"
  }
  if (token) {
    const publicKey = fs.readFileSync(`${key.privateKeyFile}public_key.pem`);
    tokenInfo = verify(token.value, publicKey)
  }
  return (
    <Suspense>
      <MainPage tokenInfo={tokenInfo} />
    </Suspense>
  )
}