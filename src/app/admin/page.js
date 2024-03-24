'use server'
import React, { Suspense } from 'react'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import fs from "fs"
import key from '@/private'
import { sign, verify } from "jsonwebtoken"
import AdminPage from './AdminPage'

const Home = ({ }) => {
  const cookieStore = cookies()
  const token = cookieStore.get('auth')

  var tokenInfo = {
    username: "Guest",
    role: "guest"
  }


  if (token) {
    const publicKey = fs.readFileSync(`${key.privateKeyFile}public_key.pem`);
    tokenInfo = verify(token.value, publicKey)
    if (tokenInfo?.role == "admin")
      return <AdminPage tokenInfo={tokenInfo} />
  }
  redirect('/')

}
export default async () => (
  <Suspense>
    <Home />
  </Suspense>
)
