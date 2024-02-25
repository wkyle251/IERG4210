'use client'
import React, { useEffect, useState, useMemo } from "react"

const SmallShoppingList = ({ shoppingCart }) => {

    const amount = shoppingCart.reduce((y, x) => x.price * x.quantity + y, 0)

    return (
        <div>

            ShoppingList ${amount}

        </div>
    )


}
export default SmallShoppingList