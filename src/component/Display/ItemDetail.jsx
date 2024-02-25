'use client'
import React, { useEffect, useState, useMemo } from "react"
import Typography from '@mui/material/Typography';
import styles from "./Display.module.css"

const ItemDetail = ({ details }) => {

    const DisplayInventory = () => {
        if (details.quantity > 3)
            return <div>
                Inventory: {details.quantity}
            </div>
        return <div className={styles.alert}>
            Only {details.quantity} left!!!
        </div>

    }

    return (
        <div>
            <Typography variant="h3">
                <DisplayInventory />
            </Typography>

            <Typography variant="h5" gutterBottom>
                description:
            </Typography>
            <Typography variant="h6" gutterBottom>
                {details.description}
            </Typography>


        </div>
    )


}
export default ItemDetail