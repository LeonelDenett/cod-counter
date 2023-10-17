"use client"
// NextJs
import Link from "next/link";
// Styles
import styles from "../page.module.css"
// Mui Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton"
// Mui Icons
import GoogleIcon from '@mui/icons-material/Google';
import EmailIcon from '@mui/icons-material/Email';
// Components
import Logo from "@/components/logo/Logo";
import AuthFormSignIn from "@/components/authForm/login/AuthFormLogin";
// Context
import { UserAuth } from "@/context/AuthContext";
// Public Route
import PublicRoute from "@/app/public/public";


function Login() {
    // Sign In Function
    const { loginWithGoogle } = UserAuth()

    return (
        <PublicRoute>
            <Box className={styles.main} sx={{padding: {xs:"2rem"}}}>
                <Box className={styles.container}>
                    {/* Logo */}
                    <Logo/>
                    {/* Form */}
                    <AuthFormSignIn />
                    {/* Reset Password */}
                    <Box className={`${styles.center} ${styles.resetPassword}`}>
                        <Link href="/auth/reset-password" className={styles.link}>
                            <Typography variant="overline">Forgot the password?</Typography>
                        </Link>
                    </Box>
                    {/* Divider */}
                    <Box className={styles.dividerContainer}>
                        <Divider className={styles.divider} flexItem>
                            or
                        </Divider>
                    </Box>
                    {/* Sign Up Link */}
                    <Box className={`${styles.center} ${styles.signUp}`}>
                        {/* Google Button */}
                        <Box className={styles.buttonContainer}>
                            <Button
                                className={styles.button}
                                variant="contained"
                                onClick={loginWithGoogle}
                                endIcon={
                                    <IconButton size="small">
                                        <GoogleIcon className={styles.icon} fontSize="small"/>
                                    </IconButton>
                                }
                            >
                                Sign in with Google
                            </Button>
                        </Box>
                        {/* Register with Email */}
                        <Box className={styles.buttonContainer}>
                        <Link href="/auth/register" className={styles.link}>
                            <Button
                                className={styles.button}
                                variant="contained"
                                endIcon={
                                    <IconButton size="small">
                                        <EmailIcon className={styles.icon} fontSize="small"/>
                                    </IconButton>}
                            >
                                Create an account
                            </Button>
                        </Link>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </PublicRoute>
    );
}

export default Login;