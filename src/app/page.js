'use client'
import styles from './page.module.css'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

//components
import ShoppingList from '../component/ShoppingList/ShoppingList'
import Categories from '../component/Categories/Categories'
import Navbar from '../component/Categories/Navbar'
import Display from '../component/Display/Display'
import { useState, useEffect } from 'react'
import axios from 'axios'
// import Link from '@mui/material/Link'
import Link from 'next/link'
import CircularProgress from '@mui/material/CircularProgress'

const Mypage = () => {
  const [shoppingCart, setShoppingCart] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const searchParams = useSearchParams()
  const category = searchParams.get('cid')
  const stockName = searchParams.get('pid')
  const [fullProduct, setFullProduct] = useState([])

  useEffect(() => {
    // initialize
    const categories = axios.post('/api/get_categories').then(res => {
      return res.data
    })
    const products = axios.post('/api/get_products').then(res => {
      return res.data
    })
    Promise.all([categories, products]).then(values => {
      const categories = values[0]
      const items = values[1].map(e => ({
        ...e,
        ...{
          category: categories.find(id => id.cid == e.categories).name,
          src: `https://myproductlist.s3.ap-southeast-1.amazonaws.com/${e.filename}`
        }
      }))
      setFullProduct(items)
      setCategoryList(categories)
    })
  }, [])

  useEffect(() => {
    // get the stock or category from url param
    if (category == null) setShoppingCart(fullProduct)
    else {
      const cart = fullProduct.filter(cartItem =>
        stockName ? cartItem._id == stockName : cartItem.categories == category
      )

      setShoppingCart(cart)
    }
  }, [category, stockName, fullProduct])

  return (
    <div className={styles.main}>
      <Link className={styles.adminLink} href='/admin'>
        Admin Panel
      </Link>
      {categoryList.length > 0 ? (
        <>
          <div className={styles.header}>
            <Categories categoryList={categoryList} />
            <ShoppingList products={fullProduct} />
          </div>
          <Navbar
            category={categoryList.find(e => e.cid == category)}
            stockName={shoppingCart.find(e => e._id == stockName)}
          />
          {shoppingCart.length > 0 && <Display shoppingCart={shoppingCart} />}
        </>
      ) : (
        <CircularProgress />
      )}
    </div>
  )
}

export default () => (
  <Suspense>
    <Mypage />
  </Suspense>
)
