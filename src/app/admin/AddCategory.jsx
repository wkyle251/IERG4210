'use client'
import React from 'react'
import styles from './page.module.css'
import { Formik, Form, Field } from 'formik'
import MySelect from './MySelect'
import { TextField } from 'formik-mui'
import { Button } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import axios from 'axios'
import randomString from '@/randomString'

const Panel = ({ }) => {
    const router = useRouter()

    const submit = (val, { setSubmitting }) => {
        val["token"] = randomString(16)
        axios.post('/api/add_category', val).then(res => {
            if (res.data.code == 200) {
                router.push('/')
            }
            setSubmitting(false)
        })
    }

    const Delete = val => {
        val["token"] = sign(val,"csrf")
        axios.post('/api/delete_category', val).then(res => {
            if (res.data.code == 200) {
                router.push('/')
            }
        })
    }

    return (
        <div className={styles.main}>
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
    )
}
export default Panel
