'use client'
import React, { useEffect, useState, useMemo } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from "@mui/material/Button"
import CardActionArea from "@mui/material/CardActionArea"
import Link from "next/link";
import styles from "./Display.module.css"
import EditIcon from '@mui/icons-material/Edit';
const Item = ({ details }) => {
    const searchParams = useSearchParams()
    const stockName = searchParams.get('pid')
    return (
        <Card >
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <Link href={{
                        pathname: "/admin", query:
                        {
                            cid: details.categories,
                            pid: details._id,
                        }
                    }}>
                        <IconButton aria-label="settings">
                            <EditIcon />
                        </IconButton>
                    </Link>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <CardActionArea>
                <Link href={{
                    pathname: "/", query:
                    {
                        cid: details.categories,
                        pid: details._id,
                    }
                }}>
                    <CardMedia
                        component="img"
                        image={details.src}
                        alt="Paella dish"
                        className={stockName ? styles.cardFullImage : styles.cardImage}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {details.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            ${details.price}
                        </Typography>
                    </CardContent>
                </Link>
            </CardActionArea>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <Button >Add to cart</Button>

            </CardActions>

        </Card>

    )


}
export default Item