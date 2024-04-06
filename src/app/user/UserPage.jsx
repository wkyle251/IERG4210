'use client'
import React, { Suspense } from 'react'
import styles from '../admin/page.module.css'
import { Tabs } from '@mui/base/Tabs'
import { Tab, TabPanel, TabsList } from '../admin/tabStyle'
import ChangePassword from './ChangePassword'
import Login from '@/component/Main/Login'
import Link from 'next/link'
import OrderTable from '../admin/OrderTable'

export default function AdminPage({ tokenInfo }) {
    return (
        <div className={styles.main}>
            <Link className={styles.adminLink} href='/'>
                Home
            </Link>
            <Login tokenInfo={tokenInfo} />
            <Tabs defaultValue={0}>
                <TabsList>
                    <Tab value={0}>Change password</Tab>
                    <Tab value={1}>Orders</Tab>
                </TabsList>
                <TabPanel value={0}>
                    <ChangePassword tokenInfo={tokenInfo} />
                </TabPanel>
                <TabPanel value={1}>
                    <OrderTable />
                </TabPanel>
            </Tabs>
        </div>
    )
}