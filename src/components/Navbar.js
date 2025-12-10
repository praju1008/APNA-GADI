import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler'; // Import modern and stylish bike icon
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const allPages = [
  { name: 'HOME', path: '/userDashboard' },
  { name: 'BOOK', path: '/book' },
  { name: 'ADMIN', path: '/login' }
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleLogout = () => {
    navigate('/Home');
  };

  const pages = allPages.filter(page => {
    if (page.name === 'Book' && location.pathname !== '/dashboard') return false;
    return true;
  });

  return (
    <AppBar position="static" className="navbar-appbar">
      <Toolbar>

        {/* Modern Bike Icon and Title */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TwoWheelerIcon sx={{ fontSize: 40, marginRight: 1, color: 'white' }} />
          <Typography variant="h6" className="navbar-title">
            Apna Gadi
          </Typography>
        </Box>

        {/* Desktop Menu - Move to Right */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, marginLeft: 'auto' }} className="navbar-buttons">
          {pages.map((page) => (
            <Button
              key={page.name}
              component={Link}
              to={page.path}
              className="navbar-button"
            >
              {page.name}
            </Button>
          ))}
        </Box>

        {/* Logout Button (Desktop) */}
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button onClick={handleLogout} className="navbar-button">Logout</Button>
        </Box>

        {/* Mobile Menu */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, marginLeft: 'auto' }}>
          <IconButton onClick={handleOpenNavMenu} className="menu-icon">
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElNav}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            className="navbar-menu"
          >
            {pages.map((page) => (
              <MenuItem
                key={page.name}
                onClick={handleCloseNavMenu}
                component={Link}
                to={page.path}
              >
                {page.name}
              </MenuItem>
            ))}
            <MenuItem onClick={() => { handleCloseNavMenu(); handleLogout(); }}>
              LOGOUT
            </MenuItem>
          </Menu>
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
