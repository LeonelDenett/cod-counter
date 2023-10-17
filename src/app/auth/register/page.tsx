"use client"

// NextJs
import Link from "next/link";
// Styles
import styles from "../page.module.css"
// Mui Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// Components
import Logo from "@/components/logo/Logo";
import AuthFormSignUp from "@/components/authForm/register/AuthFormRegister";
// Public Route
import PublicRoute from "@/app/public/public";

function Register() {
    return (
        <PublicRoute>
            <Box className={styles.main} sx={{padding: {xs:"2rem"}}}>
                <Box className={styles.container}>
                    {/* Logo */}
                    <Logo/>
                    {/* Form */}
                    <AuthFormSignUp />
                    {/* Back to Sign In */}
                    <Box className={`${styles.center} ${styles.signUp}`}>
                        <Link href="/auth/login" className={styles.link}>
                            <Typography variant="overline">Back to Login Page</Typography>
                        </Link>
                    </Box>
                </Box>
            </Box>
        </PublicRoute>
    );
}

export default Register;