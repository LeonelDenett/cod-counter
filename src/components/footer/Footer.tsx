// Styles
import styles from "./Footer.module.css";
// Mui Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'

function Footer() {
    return (
        <footer>
            <Box className={styles.footerContainer}>
                <Typography variant="body2">Copyrights © D STUDIO | All rights Reserved</Typography>
            </Box>
        </footer>
    );
}

export default Footer