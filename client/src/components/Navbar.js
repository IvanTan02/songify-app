import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { redirect, useNavigate } from 'react-router-dom';
import useProfile from '../hooks/useProfile';
import { AUTH_URL } from '../config/authUrl';

const pages = ['Dashboard', 'Statistics'];

export default function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const navigate = useNavigate();
    const { profile, loading } = useProfile();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('expiresIn');
        window.location = '/';
    };

    return (
        <AppBar position="static" sx={{ maxHeight: '20vh', backgroundColor: 'black' }}>
            <Container maxWidth="xl" sx={{ padding: 0.8 }}>
                <Toolbar disableGutters>
                    {/* REGULAR LOGO */}
                    <MusicNoteIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 0.2, fontSize: '2.5em' }} />
                    <Typography
                        variant="h4"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Songify
                    </Typography>

                    {/* RESPONSIVE NAV MENU */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* RESPONSIVE LOGO */}
                    <MusicNoteIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 0.2 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>

                    {/* REGULAR NAV LINKS */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 4 }}>
                        <Button
                            key='Home'
                            onClick={() => { navigate('/'); }}
                            sx={{ my: 2, color: 'white', display: 'block', fontSize: '1em' }}
                        >
                            Home
                        </Button>
                        <Button
                            key='Statistics'
                            onClick={() => { navigate('/statistics'); }}
                            sx={{ my: 2, color: 'white', display: 'block', fontSize: '1em' }}
                        >
                            Statistics
                        </Button>
                    </Box>

                    {/* USER SETTINGS */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            {profile ? (
                                <Chip
                                    avatar={<Avatar alt={profile?.display_name} src={profile?.images[1].url} />}
                                    label={
                                        <Box display="flex" sx={{ mr: -1, ml: 0.2 }}>
                                            <Typography>{profile?.display_name}</Typography>
                                            <KeyboardArrowDownIcon />
                                        </Box>
                                    }
                                    variant="filled"
                                    color="primary"
                                    sx={{ p: 1, mr: 3 }}
                                    onClick={handleOpenUserMenu}
                                />
                            ) : (
                                <Button
                                    key='Login'
                                    variant="contained"
                                    color="primary"
                                    href={AUTH_URL}
                                    sx={{ mr: 3 }}
                                >
                                    Login
                                </Button>
                            )}
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem key='Profile' onClick={() => { navigate('/profile'); }}>
                                <Typography textAlign="center">Profile</Typography>
                            </MenuItem>
                            <MenuItem key='Logout' onClick={handleLogout}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}