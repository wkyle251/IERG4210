'use client'
import React, { useEffect, useState, useMemo } from "react"
import styles from "./ShoppingList.module.css"
import NumberInput from "./NumberInput"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const DetailShoppingList = ({ shoppingCart, tokenInfo }) => {
    const amount = shoppingCart.reduce((y, x) => x.price * x.num + y, 0)
    const [invoice_id, _] = useState(uuidv4())
    console.log(invoice_id, "invoice_id")
    const handleChangeNum = (val, pid) => {
        var cart = JSON.parse(localStorage.getItem("cart") ?? "[]")
        const thisItemIndex = cart?.findIndex(e => e.pid == pid);
        if (val == 0)
            cart.splice(thisItemIndex, 1);
        else
            cart[thisItemIndex].num = val
        cart = cart.map(e => {
            return {
                pid: e.pid,
                num: e.num,
            }
        })
        localStorage.setItem("cart", JSON.stringify(cart))
        window.dispatchEvent(new Event("storage"));
    }

    const createOrder = async (data, actions) => {
        if (tokenInfo.role == "guest"){
            location.replace('/login')
            return 
        }
        const res = await axios.post('/api/order_details', {
            shoppingCart: shoppingCart,
            invoice_id: invoice_id,
        })
        if (res.data.code == 200) {
            return actions.order.create(res.data.orderDetails)
        }
    }

    const onApprove = async (data, actions) => {
        actions.order.capture().then(async (orderDetails) => {
            const { data } = await axios.post('/api/approve_order', orderDetails)
            if (data.code == 200) {
                localStorage.removeItem("cart")
                window.dispatchEvent(new Event("storage"));
            }
        })
    }

    const onCancel = async (data) => {
        await axios.post('/api/cancel_order', { invoice_id: invoice_id })
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
            <div className={styles.paypal}>
                {shoppingCart.length != 0 &&
                    <PayPalScriptProvider
                        options={{
                            clientId: "AQunscwV6ntfe3WDb3JYIkGGkRDCiFEVnYhTZXCEtUTTFGhoOR2IHk4MOsxIxQXpDPKQ9DEpPH0rYv2q",
                            currency: "USD",
                        }}
                    >
                        <PayPalButtons
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onCancel={onCancel}
                            onError={onCancel}
                        />
                    </PayPalScriptProvider>
                }
            </div>
        </div>
    )


}
export default DetailShoppingList