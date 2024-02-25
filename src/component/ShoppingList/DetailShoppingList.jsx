'use client'
import React, { useEffect, useState, useMemo } from "react"
import styles from "./ShoppingList.module.css"
import Button from "@mui/material/Button"
import Input from "@mui/material/Input"

const DetailShoppingList = ({ shoppingCart }) => {
    const amount = shoppingCart.reduce((y, x) => x.price * x.quantity + y, 0)

    return (
        <div className={styles.detail_shoppingCart}>
            Shopping List(Total: ${amount})
            <div className={styles.shopping_cart_row}>

                <div className={styles.shopping_cart_item} >name:</div>
                <div className={styles.shopping_cart_item} >price:</div>
                <div className={styles.shopping_cart_item} >quantity:</div>
            </div>
            {shoppingCart.map((item, i) => (
                <div className={styles.shopping_cart_row} key={i}>
                    <div className={styles.shopping_cart_item}>
                        {item.name}
                    </div>
                    <div className={styles.shopping_cart_item}>
                        {item.price}
                    </div>
                    <div className={styles.shopping_cart_item}>
                        <Input ></Input>
                        
                    </div>
                </div>
            ))}
            <Button >Checkout</Button>
        </div>
    )


}
export default DetailShoppingList