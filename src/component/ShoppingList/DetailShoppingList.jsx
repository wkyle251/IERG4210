'use client'
import React, { useEffect, useState, useMemo } from "react"
import styles from "./ShoppingList.module.css"
import Button from "@mui/material/Button"
import NumberInput from "./NumberInput"

const DetailShoppingList = ({ shoppingCart }) => {
    const amount = shoppingCart.reduce((y, x) => x.price * x.num + y, 0)
    const handleChangeNum = (val, pid) => {
        var cart = JSON.parse(localStorage.getItem("cart") ?? "[]")
        const thisItemIndex = cart?.findIndex(e => e.pid == pid);
        if (val == 0)
            cart.splice(thisItemIndex, 1);
        else
            cart[thisItemIndex].num = val
        cart = cart.map(e=>{
            return {
                pid: e.pid,
                num: e.num,
            }
        })
        localStorage.setItem("cart", JSON.stringify(cart))
        window.dispatchEvent(new Event("storage"));
    }

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
                        <NumberInput
                            item={item}
                            handleChange={val => handleChangeNum(val, item.pid)}
                        />

                    </div>
                </div>
            ))}
            <Button >Checkout</Button>
        </div>
    )


}
export default DetailShoppingList