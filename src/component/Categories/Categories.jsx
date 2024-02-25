'use client'
import React, { useEffect, useState, useMemo } from "react"
import Link from '@mui/material/Link';
import styles from "./Navbar.module.css";
import axios from "axios";
const Categories = ({ categoryList }) => {

    return (
        <div className={styles.categories}>
            <div>
                Categories:
            </div>

            {categoryList.map((category) => (
                <Link
                    underline="hover"
                    key={category.cid}
                    color="inherit"
                    href={`/?cid=${category.cid}`}
                    className={styles.categoryItem}
                    
                >
                    {category.name}
                </Link>
            ))}


        </div>
    )


}
export default Categories