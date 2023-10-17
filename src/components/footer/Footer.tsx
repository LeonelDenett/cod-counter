// Styles
import styles from "./Footer.module.css";
// Mui Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'

function Footer() {
    return (
        <footer style={{background: "linear-gradient(to right, #f83600, #fe8c00)"}}>
            <Box className={styles.footerContainer}>
                <Typography variant="body1">©2023 Leonel Denett - Cod Counter</Typography>
            </Box>
        </footer>
    );
}

export default Footer