// src/components/AdminNavbar.js
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler'; // Import modern and stylish bike icon

import './AdminNavbar.css'; // 👈 Import your custom admin navbar styles

const AdminNavbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    setDrawerOpen(false);
    if (path === '/logout') {
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  const navItems = [
    { label: 'Admin Home', path: '/admin-home' },
    { label: 'Add Vehicle', path: '/adminadd-vehicle' },
    { label: 'View Booking', path: '/adminview-booking' },
    { label: 'LogOut', path: '/userDashboard' }
  ];

  return (
    <>
      <AppBar position="static" className="admin-navbar-appbar">
        <Toolbar>
          <Typography variant="h6" className="admin-navbar-title">
            <TwoWheelerIcon sx={{ fontSize: 40, marginRight: 1, color: 'white' }} />
            
            Admin Panel
          </Typography>
          <Box className="admin-navbar-buttons" sx={{ display: { xs: 'none', md: 'flex' } }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                onClick={() => handleNavigation(item.path)}
                className="admin-navbar-button"
              >
                {item.label}
              </Button>
            ))}
          </Box>
          <IconButton
            edge="end"
            className="admin-menu-icon"
            sx={{ display: { md: 'none' } }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        className="admin-navbar-menu"
      >
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {navItems.map((item) => (
              <ListItem button key={item.label} onClick={() => handleNavigation(item.path)}>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default AdminNavbar;
