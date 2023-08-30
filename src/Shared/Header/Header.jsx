import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { AuthContext } from '../../Provider/AuthProvider';
import { Button } from 'react-bootstrap';
import { AiOutlineLogout } from 'react-icons/ai'; // 


const drawerWidth = 240;

function Dashboard(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const { logOut, user } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
        
            .catch(error => console.log(error));
    }

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {['My Notes', 'Add a Note'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <Link to={`/${text.split(' ').join('')}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItemButton onClick={() => setMobileOpen(false)}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <TextSnippetIcon /> : <NoteAddIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
      
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                        
                        <Link to="/"> <img style={{ width: '150px', marginLeft:'-15px' , marginTop:'5px'}} src="https://i.ibb.co/R2RvgNW/0aa3a7e426db7f0c362c4e28bde227fa63c81bdf.png" alt="" /></Link>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
                    <Toolbar />
                   
               
                {
                    user ?
                        <div style={{ position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)' }}>
                            <Button
                                style={{
                                    backgroundColor: '#ff4757',
                                    color: 'white',
                                    borderRadius: '5px',
                                    padding: '10px 15px',
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s ease',
                                }}
                                onClick={handleLogOut}
                            >
                                Log Out <AiOutlineLogout style={{ marginLeft: '15px' }} />
                            </Button>
                        </div>

                        : <></>
                }
                </Box>
            </Box>
      
    );
}

Dashboard.propTypes = {
    window: PropTypes.func,
};

export default Dashboard;
