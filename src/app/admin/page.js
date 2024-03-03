'use client'
import React, { useEffect, useState, useMemo, Suspense } from 'react'
import styles from '../page.module.css'
import { FileUploader } from 'react-drag-drop-files'
const fileTypes = ['JPG', 'PNG', 'GIF', 'JPEG']
import { Formik, Form, Field } from 'formik'
import MySelect from './MySelect'
import { TextField } from 'formik-mui'
import { Button } from '@mui/material'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import axios from 'axios'
const Panel = ({}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = searchParams.get('cid')
  const stockName = searchParams.get('pid')
  const [initialValue, setInitialValue] = useState(null)

  useEffect(() => {
    if (stockName)
      axios.post('/api/get_products').then(res => {
        setInitialValue(res.data.find(e => e._id == stockName))
      })
    else
      setInitialValue({
        file: null,
        name: '',
        price: 0,
        quantity: 0,
        description: '',
        categories: '',
        newCategory: '',
        pid: null,
      })
  }, [category, stockName])

  const submit = val => {
    const formData = new FormData()
    formData.append('edit', stockName ? true : false)
    for (const key in val) {
      formData.append(key, val[key])
    }
    axios.post('/api/put_product', formData).then(res => {
      if (res.data.code == 200) {
        router.push('/')
      }
    })
  }

  const Delete = pid => {
    const formData = new FormData()
    formData.append('pid', pid)
    fetch('/api/delete_product', {
      method: 'POST',
      body: formData
    })
  }

  return (
    <div className={styles.main}>
      <div className={''}>
        <div className={styles.panelTitle}>Admin Panel!</div>
        {initialValue && (
          <Formik initialValues={initialValue} onSubmit={submit}>
            {props => {
              const { setFieldValue, values } = props
              return (
                <Form className={styles.form}>
                  <MySelect />
                  {values.categories == -1 && (
                    <Field
                      name='newCategory'
                      label='New Category Name'
                      variant='standard'
                      component={TextField}
                    />
                  )}
                  <Field
                    name='name'
                    label='product name'
                    variant='standard'
                    component={TextField}
                  />
                  <Field
                    name='price'
                    label='price $'
                    variant='standard'
                    component={TextField}
                    validate={value => {
                      const regex = /^-?\d+(\.\d+)?$/
                      if (!value) return 'there must be some value'
                      if (!regex.test(value.toString()))
                        return 'only number is allowed'
                    }}
                  />
                  <Field
                    name='quantity'
                    label='quantity'
                    variant='standard'
                    component={TextField}
                    validate={value => {
                      const regex = /^-?\d+$/
                      if (!value) return 'there must be some value'
                      if (!regex.test(value.toString()))
                        return 'only integer is allowed'
                    }}
                  />
                  <Field
                    name='description'
                    label='description'
                    component={TextField}
                    multiline
                  />
                  <FileUploader
                    handleChange={file => {
                      setFieldValue('file', file)
                    }}
                    name='file'
                    types={fileTypes}
                    multiple={false}
                    maxSize={5}
                  />
                  <div>
                    {stockName ? (
                      <div>
                        <Button type='submit'>Edit Item</Button>
                        <Button
                          color='error'
                          onclick={() => Delete(values.pid)}
                        >
                          Delete Item
                        </Button>
                      </div>
                    ) : (
                      <Button type='submit'>Add Item</Button>
                    )}
                  </div>
                </Form>
              )
            }}
          </Formik>
        )}
      </div>
    </div>
  )
}
export default () => (
  <Suspense>
    <Panel />
  </Suspense>
)
