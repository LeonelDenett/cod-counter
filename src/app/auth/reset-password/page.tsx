"use client"
// NextJs
import Link from "next/link";
// Styles
import styles from "./page.module.css"
// Mui Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import AuthInput from "@/components/authInput/AuthInput";
import Button from "@mui/material/Button";
// Formik
import { FormikHelpers, Form, Field, Formik, useFormik } from "formik";
// Yup
import { resetPasswordSchema } from "@/validations/AuthValidations";
import { UserAuth } from "@/context/AuthContext";
import { TextField } from "@mui/material";

// Firebase
import { auth } from "@/firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";


interface Values {
    email: string;
}

function ResetPassword() {
    const { resetPassword, isButtonDisabled, secondsRemaining } = UserAuth();

    return (
        <Box className={styles.main} sx={{padding: {xs:"2rem"}}}>
            <Typography variant="h3" mb={2}>Reset your Password</Typography>
            <Box className={styles.container}>
                <Formik
                    initialValues={{email: '',}}
                    onSubmit={(
                    values: Values,
                    { setSubmitting }: FormikHelpers<Values>
                    ) => {
                        const {email} = values;
                        resetPassword(email).then(() => {
                            console.log("email enviado a:", email)
                        }).catch(((error: any) => {
                            console.log("error:", error)
                        }))
                        setSubmitting(false);
                    }}
                    validationSchema={resetPasswordSchema}
                >
                    <Form className={styles.form}>
                        <Typography color="primary" mb={6}>
                            Please provide your email, and we'll dispatch an email containing instructions to restore your account.
                        </Typography>
                        <Field
                            id="email"
                            name="email"
                            label="email"
                            component={AuthInput}
                        />
                        <Button type="submit" variant="contained">
                            {isButtonDisabled ? `Resend in ${secondsRemaining} seconds` : `Send`}
                        </Button>
                        {/* Link to Login Page */}
                        <Link href="/auth/login">
                            <Button className={styles.backButton} type="submit" variant="contained">
                                Back
                            </Button>
                        </Link>
                    </Form>
                </Formik>
            </Box>
        </Box>
    );
}

export default ResetPassword;