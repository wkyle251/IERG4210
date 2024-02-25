'use client'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import React, { useEffect, useState, useMemo } from "react"

const Navbar = ({ category, stockName }) => {

    return (
        <div>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    Home
                </Link>
                {category && category != 'All' &&
                    <Link underline="hover" color="inherit" href={`/${category.cid}`}>
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
