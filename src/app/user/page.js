'use server'
import React, { Suspense } from 'react'
import styles from '../admin/page.module.css'
import { Tabs } from '@mui/base/Tabs'
import { Tab, TabPanel, TabsList } from '../admin/tabStyle'

// import AddProduct from './AddProduct'
// import AddCategory from './AddCategory'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import fs from "fs"
import key from '@/private'
import { sign, verify } from "jsonwebtoken"
import Login from '@/component/Main/Login'
import ChangePassword from './ChangePassword'

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
            <Tabs defaultValue={0}>
                <TabsList>
                    <Tab value={0}>Change password</Tab>
                </TabsList>
                <TabPanel value={0}>
                    <ChangePassword tokenInfo={tokenInfo} />
                </TabPanel>
            </Tabs>
        </div>
    )

    if (token) {
        const publicKey = fs.readFileSync(`${key.privateKeyFile}public_key.pem`);
        tokenInfo = verify(token.value, publicKey)
        if (tokenInfo?.role == "user")
            return <AdminPage />
    }
    return <AdminPage />
    // redirect('/')

}
export default async () => (
    <Suspense>
        <Panel />
    </Suspense>
)
