'use client'
import React, { useEffect, useState, useMemo } from "react"
import styles from "./ShoppingList.module.css"

import SmallShoppingList from "./SmallShoppingList"
import DetailShoppingList from "./DetailShoppingList"

const ShoppingList = ({ products, tokenInfo }) => {

    const [shoppingCart, setShoppingCart] = useState([])

    const refreshCart = () => {
        const myStorage = JSON.parse(localStorage.getItem('cart') ?? "[]")
        const parseStorage = myStorage.map(e => {
            return {
                ...e,
                ...products.find(item => item.pid == e.pid)
            }
        })
        setShoppingCart(parseStorage)
    }

    useEffect(() => {
        refreshCart()
        window.addEventListener('storage', () => {
            refreshCart()
        });
    }, [products])

    return (
        <div className={styles.container}>
            <div className={styles.small}>
                <SmallShoppingList
                    shoppingCart={shoppingCart}
                />
            </div>
            <div className={styles.detail}>
                <DetailShoppingList
                    shoppingCart={shoppingCart}
                    tokenInfo={tokenInfo}
                />
            </div>
        </div>
    )


}
export default ShoppingList