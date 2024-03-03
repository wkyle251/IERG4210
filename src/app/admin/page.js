'use client'
import React, { useEffect, useState, useMemo, Suspense } from 'react'
import styles from '../page.module.css'
import { Tabs } from '@mui/base/Tabs'
import { Tab, TabPanel, TabsList } from './tabStyle'

import AddProduct from './AddProduct'
import AddCategory from './AddCategory'
import Link from 'next/link'

const Panel = ({}) => {
  return (
    <div className={styles.main}>
      <Link className={styles.adminLink} href='/'>
        Home
      </Link>
      <Tabs defaultValue={1}>
        <TabsList>
          <Tab value={0}>Add/Edit Category</Tab>
          <Tab value={1}>Add/Edit Product</Tab>
        </TabsList>
        <TabPanel value={0}>
          <AddCategory />
        </TabPanel>
        <TabPanel value={1}>
          <AddProduct />
        </TabPanel>
      </Tabs>
    </div>
  )
}
export default () => (
  <Suspense>
    <Panel />
  </Suspense>
)
