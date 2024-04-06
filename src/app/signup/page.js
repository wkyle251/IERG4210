'use client'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Formik, Form, Field } from 'formik'
import { TextField, Checkbox } from 'formik-mui'
import axios from 'axios';

const defaultTheme = createTheme();

export default function SignUp() {
    const handleSubmit = async (val, { setSubmitting, setErrors }) => {

        const res = await axios.post("/api/signup", val)
        switch (res.data.code) {
            case 200:
                location.replace('/login')
            case 203:
                setSubmitting(false)
                setErrors({
                    username: "Username Exist!"
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
    };

    const checkEmail = value =>{
        const regex = /(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        if (!value) return 'there must be some value'
        if (!regex.test(value.toString()))
            return 'Invalid Email'
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Formik
                        initialValues={{
                            username: "",
                            password: "",
                            verifyPassword: "",
                            isAdmin: false,
                        }}
                        onSubmit={handleSubmit}
                    >
                        {props => {
                            const { values } = props

                            return (
                                <Form>
                                    <Box sx={{ mt: 3 }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Field
                                                    component={TextField}
                                                    required
                                                    fullWidth
                                                    id="email"
                                                    label="Username"
                                                    name="username"
                                                    autoComplete="username"
                                                    validate={checkEmail}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Field
                                                    component={TextField}
                                                    required
                                                    fullWidth
                                                    name="password"
                                                    label="Password"
                                                    type="password"
                                                    id="password"
                                                    autoComplete="new-password"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Field
                                                    component={TextField}
                                                    required
                                                    fullWidth
                                                    name="verifyPassword"
                                                    label="Password"
                                                    type="password"
                                                    id="verifyPassword"
                                                    autoComplete="new-password"
                                                    validate={(val) => {
                                                        if (val != values.password)
                                                            return "Password Not Match"
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Field
                                            component={Checkbox}
                                            name="isAdmin"
                                        />Admin Account
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Sign Up
                                        </Button>
                                        <Grid container justifyContent="flex-end">
                                            <Grid item>
                                                <Link href="/login" variant="body2">
                                                    Already have an account? Sign in
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Form>
                            )
                        }}
                    </Formik>
                </Box>
            </Container>
        </ThemeProvider>
    );
}