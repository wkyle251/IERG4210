'use client'
import React, { useEffect, useState, useMemo, Suspense } from 'react'
import styles from '../page.module.css'
import { Formik, Form, Field } from 'formik'
import MySelect from './MySelect'
import { TextField } from 'formik-mui'
import { Button } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import axios from 'axios'

const Panel = ({ }) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const category = searchParams.get('cid')
    const stockName = searchParams.get('pid')

    const submit = (val, { setSubmitting }) => {

        axios.post('/api/add_category', val).then(res => {
            if (res.data.code == 200) {
                router.push('/')
                setSubmitting(false)
            }
        })
    }

    const Delete = val => {
        axios.post('/api/delete_category', val).then(res => {
            if (res.data.code == 200) {
                router.push('/')
            }
        })
    }

    return (
        <div className={styles.main}>
            <div className={''}>
                <div className={styles.panelTitle}>Admin Panel!</div>
                <Formik initialValues={{ newCategory: "", categories: -1 }} onSubmit={submit}>
                    {props => {
                        const { setFieldValue, values, isSubmitting } = props
                        return (
                            <Form className={styles.form}>
                                <MySelect />
                                <Field
                                    name='newCategory'
                                    label='New Category Name'
                                    variant='standard'
                                    component={TextField}
                                />

                                <div>
                                    {values.categories != -1 ? (
                                        <div className={styles.twoButton}>
                                            <Button
                                                variant="outlined"
                                                type='submit'
                                                disabled={isSubmitting}
                                            >Edit Category</Button>
                                            <Button
                                                color='error'
                                                variant="outlined"
                                                disabled={isSubmitting}
                                                onClick={() => Delete(values)}
                                            >
                                                Delete Category
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button
                                            variant="outlined"
                                            type='submit'
                                            disabled={isSubmitting}
                                        >Add Category</Button>
                                    )}
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </div>
    )
}
export default () => (
    <Suspense>
        <Panel />
    </Suspense>
)
