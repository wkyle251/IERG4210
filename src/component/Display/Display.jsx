'use client'
import React, { useEffect, useState, useMemo } from "react"
import styles from "./Display.module.css"
import Item from "./Item"
import ItemDetail from "./ItemDetail"
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

const Display = ({ shoppingCart }) => {
    const searchParams = useSearchParams()
    const stockName = searchParams.get('pid')

    const ShopList = () => (
        <div className={styles.container}>
            {shoppingCart.map((item, i) =>
                <div
                    className={styles.stockItem}
                    key={i}
                >
                    <Item
                        details={item}
                    />
                </div>
            )}

        </div>)

    const SingleStock = () => (
        <div className={styles.singleStock}>
            <Item details={shoppingCart[0]} />
            <ItemDetail details={shoppingCart[0]} />
        </div>
    )

    if (stockName)
        return <SingleStock />
    return <ShopList />


}
export default Display