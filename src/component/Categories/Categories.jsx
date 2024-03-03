'use client'
import React, { useEffect, useState, useMemo } from "react"
// import Link from '@mui/material/Link';
import styles from "./Navbar.module.css";
import Link from "next/link";

const Categories = ({ categoryList }) => {

    return (
        <div className={styles.categories}>
            <div>
                Categories:
            </div>
            <div className={styles.items}>
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

        </div>
    )


}
export default Categories