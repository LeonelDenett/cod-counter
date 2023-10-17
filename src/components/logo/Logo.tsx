// NextJs
import Image from "next/image";
// Styles
import styles from './Logo.module.css'
// Mui Components
import Box from '@mui/material/Box';
// Image
import logo from '../../../public/logo.jpeg'

function Logo() {
    return (
        <Box className={styles.container}>
            <Image className={styles.image} alt="Logo" src={logo} />
        </Box>
    );
}

export default Logo;