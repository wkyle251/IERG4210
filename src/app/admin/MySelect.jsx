import React, { useEffect, useState, useMemo } from "react"
import MenuItem from '@mui/material/MenuItem';
import { Select } from 'formik-mui';
import { Field } from "formik";
import axios from "axios";

export default function MySelect() {

    const [categoryList, setCategoryList] = useState([])

    useEffect(() => {
        axios.post('/api/get_categories').then((res => {
            const { data } = res
            setCategoryList(data)
        }))
    }, [])


    return (
        <Field name={'categories'}
            component={Select}
            label="categories"
        >
            {categoryList.map((e, i) => (
                <MenuItem key={i} value={e.cid}>{e.name}</MenuItem>

            ))}
        </Field>
    );
}