'use client'
import React, { useEffect, useState, useMemo } from 'react'
import styles from '../page.module.css'
import { FileUploader } from 'react-drag-drop-files'
const fileTypes = ['JPG', 'PNG', 'GIF', 'JPEG']
import { Formik, Form, Field } from 'formik'
import MySelect from './MySelect'
import { TextField } from 'formik-mui'
import { Button } from '@mui/material'
import { redirect, useRouter } from 'next/navigation'

const Panel = ({}) => {
  const router = useRouter()

  const initialValue = {
    file: null,
    name: '',
    price: 0,
    quantity: 0,
    description: '',
    categories: ''
  }

  const submit = (val)=>{
    const formData = new FormData()
    for (const key in val) {
        formData.append(key, val[key])
    }
    fetch('/api/put_product', {
      method: 'POST',
      body: formData
    })
      .then(response => router.push('/'))
      .then(data => console.log(data))
      .catch(error => console.error(error))
  }

  return (
    <div className={styles.main}>
      <div className={''}>
      <div className={styles.panelTitle}>Admin Panel!</div>
        <Formik
         initialValues={initialValue}
        onSubmit={submit}
        >
          {props => {
            const {
              setFieldValue,
            } = props
            return (
              <Form className={styles.form}>
                <MySelect />
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
                    setFieldValue('file',file)
                  }}
                  name='file'
                  types={fileTypes}
                  multiple={false}
                  maxSize={5}
                />
                <Button type="submit">submit</Button>
              </Form>
            )
          }}
        </Formik>
      </div>
    </div>
  )
}
export default Panel
