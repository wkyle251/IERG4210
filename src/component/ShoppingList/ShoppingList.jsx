'use client'
import React, { useEffect, useState, useMemo } from "react"
import styles from "./ShoppingList.module.css"

import SmallShoppingList from "./SmallShoppingList"
import DetailShoppingList from "./DetailShoppingList"

const ShoppingList = ({ }) => {

    const shoppingCart = [
        {
            "category": "1",
            "name": "name1",
            "price": 1,
            "quantity": 1,
        },
        {
            "category": "1",
            "name": "name2",
            "price": 2,
            "quantity": 2,
        },
        {
            "category": "2",
            "name": "name3",
            "price": 3,
            "quantity": 3,
        },

    ]
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