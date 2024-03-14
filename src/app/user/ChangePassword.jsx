'use client'
import styles from '../admin/page.module.css'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-mui'
import { Button } from '@mui/material'
import axios from 'axios'

const ChangePassword = ({ tokenInfo }) => {

    const submit = async (val, { setSubmitting, setErrors }) => {
        const res = await axios.post('/api/change_pass', val)
        switch (res.data.code) {
            case 200:
                location.replace('/')
            case 203:
                setSubmitting(false)
                setErrors({
                    password: "Invalid password"
                })
                break;
            case 205:
                setSubmitting(false)
                setErrors({
                    verifyPassword: "Password Not Match"
                })
            default:
                setSubmitting(false)

        }
    }

    return (
        <div className={styles.main}>
            <div className={styles.panelTitle}>Password Setting</div>
            <Formik initialValues={{
                username: tokenInfo.username,
                password: "",
                newPassword: "",
                verifyPassword: "",
            }} onSubmit={submit}>
                {props => {
                    const { values, isSubmitting } = props
                    return (
                        <Form className={styles.form}>
                            <Field
                                component={TextField}
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Username"
                                name="username"
                                autoComplete="email"
                                disabled
                            />
                            <Field
                                component={TextField}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Current Password"
                                type="password"
                                autoFocus
                            />
                            <Field
                                component={TextField}
                                margin="normal"
                                required
                                fullWidth
                                name="newPassword"
                                label="New Password"
                                type="password"
                                autoComplete="current-password"
                            />
                            <Field
                                component={TextField}
                                margin="normal"
                                required
                                fullWidth
                                name="verifyPassword"
                                label="Confirm Password"
                                type="password"
                                autoComplete="current-password"
                                validate={(val) => {
                                    if (val != values.newPassword)
                                        return "Password Not Match"
                                }}
                            />
                            <div>
                                <Button
                                    variant="outlined"
                                    type='submit'
                                    disabled={isSubmitting}
                                >Change Password</Button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>

        </div>
    )
}
export default ChangePassword
