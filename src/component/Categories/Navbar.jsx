'use client'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState, useMemo } from "react"
import Link from "next/link";
import styles from "./Navbar.module.css";

const Navbar = ({ category, stockName }) => {

    return (
        <div className={styles.Navbar}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    Home
                </Link>
                {category && category != 'All' &&
                    <Link underline="hover" color="inherit" href={`./?cid=${category.cid}`}>
                        {category.name}
                    </Link>
                }
                {stockName &&
                    <Typography>
                        {stockName.name}
                    </Typography>

                }

            </Breadcrumbs>
        </div>
    )


}
export default Navbar
