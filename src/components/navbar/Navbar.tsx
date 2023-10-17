// NextJs
import { useState, useEffect } from 'react';
// Styles
import styles from "./Navbar.module.css"
// Mui Components
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// Mui Icons
import MenuIcon from '@mui/icons-material/Menu';
// Context
import { UserAuth } from "@/context/AuthContext";
import MyDrawer from '../drawer/Drawer';

function Navbar() {
    // Sign In & Logout Function
    const { user, logout } = UserAuth()

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const openDrawer = () => {
        setIsDrawerOpen(true);
        console.log("open drawer")
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
        console.log("close drawer")
    };

    return (
        <Box sx={{ flexGrow: 1, display:"flex"}}>
            <AppBar position="static">
                <Toolbar className={!user ? styles.navbar : ""}>
                    {
                        !user ? (
                            <Typography variant='h6'>Cod Counter</Typography>
                        ) : (
                            <Box className={styles.navbarUser}>
                                <Box className={styles.center}>
                                    <IconButton
                                        size="large"
                                        edge="start"
                                        color="inherit"
                                        aria-label="menu"
                                        onClick={openDrawer}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                    {/* Drawer */}
                                    <MyDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
                                    {/* User Info */}
                                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                        {user?.displayName}
                                    </Typography>
                                </Box>
                                <Button variant="contained" onClick={logout}>Logout</Button>
                            </Box>
                        )
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;