'use client'
import React, { useEffect, useState, useMemo } from "react"
import styles from "./ShoppingList.module.css"

import SmallShoppingList from "./SmallShoppingList"
import DetailShoppingList from "./DetailShoppingList"

const ShoppingList = ({ products }) => {

    const [shoppingCart, setShoppingCart] = useState([])
    useEffect(() => {
        window.addEventListener('storage', () => {
            const myStorage = JSON.parse(localStorage.getItem('cart') ?? "[]")
            const parseStorage = myStorage.map(e => {
                return {
                    ...e,
                    ...products.find(item => item.pid == e.pid)
                }
            })
            setShoppingCart(parseStorage)
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
                />
            </div>
        </div>
    )


}
export default ShoppingList