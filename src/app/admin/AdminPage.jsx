'use client'
import ChangePassword from '../user/ChangePassword'
import AddProduct from './AddProduct'
import styles from './page.module.css'
import AddCategory from './AddCategory'
import { Tabs } from '@mui/base/Tabs'
import { Tab, TabPanel, TabsList } from './tabStyle'
import Link from 'next/link'
import Login from '@/component/Main/Login'
import OrderTable from './OrderTable'

const AdminPage = ({ tokenInfo }) => {

  return (
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
          <Tab value={3}>Orders</Tab>
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
        <TabPanel value={3}>
          <OrderTable />
        </TabPanel>
      </Tabs>
    </div>
  )
}
export default AdminPage