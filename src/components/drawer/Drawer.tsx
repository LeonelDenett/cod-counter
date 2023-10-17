'use client'

// NextJs
import Link from "next/link";
import styles from './Drawer.module.css';
// Mui Components
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// Mui Icons
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import GroupsIcon from '@mui/icons-material/Groups';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import HomeIcon from '@mui/icons-material/Home';

interface DrawerProps {
    isOpen: boolean,
    onClose: () =>  void;
}

function MyDrawer({isOpen, onClose}: DrawerProps) {

    const items = [
        {
            id: 1,
            header: "Menu",
            icon: <HomeIcon fontSize="large"/>,
            subtitle: "dashboard",
            href: "/dashboard",
        },
        {
            id: 2,
            header: "Team",
            icon: <AddBoxRoundedIcon fontSize="large"/>,
            subtitle: "Create team",
            href: "/team/new",
        },
        {
            id: 3,
            header: "Cod",
            icon: <CreateRoundedIcon fontSize="large"/>,
            subtitle: "New game",
            icon2:  <MilitaryTechIcon fontSize="large"/>,
            subtitle2: "Historic",
            href: "/codi/dashboard",
            href2: "/codi/historial"

        },
    ];
    return (
        <Box>
            <Drawer
                variant="temporary"
                anchor={"left"}
                open={isOpen}
                onClose={onClose}
            >
                <Box className={styles.drawerContainer}>
                    <List sx={{width:"100%", display:"flex", flexDirection:"column", flexGrow:1, paddingTop: "4rem"}}>
                    {/* Team and Codi */}
                    {items.map((item, index) => (
                    <Box key={index} my={3}>
                        <ListSubheader sx={{backgroundColor: 'transparent'}}>
                            <Typography sx={{fontSize:"1.15rem"}}>{item.header}</Typography>
                        </ListSubheader>
                        <ListItem className={styles.listItem} key={index} disablePadding>
                            <Link href={item.href} className={styles.links}>
                                <ListItemButton onClick={onClose}>
                                    <ListItemIcon sx={{color: '#ffffff'}}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText className={styles.subtitle} sx={{color: '#ffffff'}} primary={item.subtitle} primaryTypographyProps={{fontSize:"1rem"}}/>
                                </ListItemButton>
                            </Link>
                        </ListItem>
                        {item.icon2 && item.subtitle2 && item.href2 && (
                            <ListItem key={`${index}_2`} disablePadding>
                            <Link href={item.href2} className={styles.links}>
                                <ListItemButton onClick={onClose}>
                                    <ListItemIcon sx={{color: '#ffffff'}}>
                                        {item.icon2}
                                    </ListItemIcon>
                                    <ListItemText sx={{color: '#ffffff'}} primary={item.subtitle2} primaryTypographyProps={{fontSize: "1rem"}} />
                                </ListItemButton>
                            </Link>
                            </ListItem>
                        )}
                    </Box>
                    ))}
                </List>
                </Box>
            </Drawer>
        </Box>
    );
}

export default MyDrawer;