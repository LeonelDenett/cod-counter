// NextJs
import Image from "next/image";
// Styles
import styles from "./page.module.css";
// Mui Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// Mui Icons
import SettingsIcon from "@mui/icons-material/Settings";
// Logo
import Logo from "@/components/logo/Logo";
// Framer Motion
import { motion } from "framer-motion";
import { fade, preLoader, preLoaderIcon, zoomingIn, logo } from "../../framer-motion/Variants";

function PreLoader() {
    return (
        <Box
            className={styles.container}
            component={motion.div}
            variants={fade}
            initial="start"
            animate="animate"
            exit="exit"
            key="PreLoader"
        >
            {/* Content */}
            <Box
                component={motion.div}
                className={styles.card}
                variants={preLoader}
                initial="start"
                animate="animate"
                exit="exit"
                key="Card"
            >
                {/* Logo */}
                <Box
                    component={motion.div}
                    variants={logo}
                    initial="start"
                    animate="animate"
                    exit="exit"
                    className={styles.logoContainer}
                >
                    <Logo/>
                </Box>
                {/* Loading & Icon */}
                <Box className={styles.loading}>
                    <Box className={styles.center}>
                        <Typography
                            component={motion.h2}
                            color="primary"
                            mr={1}
                            variant="h4"
                            variants={zoomingIn}
                            initial="start"
                            animate="animate"
                            exit="exit"
                        >
                            Loading
                        </Typography>
                        <SettingsIcon
                            component={motion.svg}
                            variants={preLoaderIcon}
                            initial="start"
                            animate="animate"
                            exit="exit"
                            color="primary"
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default PreLoader;