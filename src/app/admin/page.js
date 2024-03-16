'use server'
import React, { Suspense } from 'react'
import styles from './page.module.css'
import { Tabs } from '@mui/base/Tabs'
import { Tab, TabPanel, TabsList } from './tabStyle'

import AddProduct from './AddProduct'
import AddCategory from './AddCategory'
import Link from 'next/link'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import fs from "fs"
import key from '@/private'
import { sign, verify } from "jsonwebtoken"
import Login from '@/component/Main/Login'
import ChangePassword from '../user/ChangePassword'

const Panel = ({ }) => {
  const cookieStore = cookies()
  const token = cookieStore.get('auth')

  var tokenInfo = {
    username: "Guest",
    role: "guest"
  }

  const AdminPage = () => (
    <div className={styles.main}>
      <Link className={styles.adminLink} href='/'>
        Home
      </Link>
      <Login tokenInfo={tokenInfo} />
      <Tabs defaultValue={1}>
        <TabsList>
          <Tab value={0}>Add/Edit Category</Tab>
          <Tab value={1}>Add/Edit Product</Tab>
          <Tab value={2}>Edit Password</Tab>
        </TabsList>
        <TabPanel value={0}>
          <AddCategory />
        </TabPanel>
        <TabPanel value={1}>
          <AddProduct />
        </TabPanel>
        <TabPanel value={2}>
          <ChangePassword tokenInfo={tokenInfo} />
        </TabPanel>
      </Tabs>
    </div>
  )

  if (token) {
    const publicKey = fs.readFileSync(`${key.privateKeyFile}public_key.pem`);
    tokenInfo = verify(token.value, publicKey)
    if (tokenInfo.role = "admin")
      return <AdminPage />
  }
  redirect('/')

}
export default async () => (
  <Suspense>
    <Panel />
  </Suspense>
)
