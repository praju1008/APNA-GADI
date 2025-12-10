import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Grid,
  Paper,
  CircularProgress
} from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupIcon from '@mui/icons-material/Group';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EventNoteIcon from '@mui/icons-material/EventNote';
import axios from 'axios';

// Card Component
const StatCard = ({ icon, title, value }) => (
  <Paper
    elevation={4}
    sx={{
      p: 3,
      background: 'linear-gradient(135deg, #1f1f1f, #2b2b2b)',
      color: '#fff',
      textAlign: 'center',
      borderRadius: 3,
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
      },
    }}
  >
    {icon}
    <Typography variant="h6" sx={{ mt: 1 }}>{title}</Typography>
    <Typography variant="body2" sx={{ color: '#ccc' }}>{value}</Typography>
  </Paper>
);

// Admin Home Component
const AdminHome = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/stats');
        console.log('Fetched stats:', res.data);
        setStats(res.data);
      } catch (error) {
        console.error('Error fetching admin stats:', error.message);
        if (error.response) {
          console.error('Response Data:', error.response.data);
          console.error('Status Code:', error.response.status);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <Box sx={{ backgroundColor: '#f4f4f4', minHeight: '100vh', px: 3, py: 5 }}>
      {/* Header */}
      <Box
        sx={{
          textAlign: 'center',
          p: 4,
          background: 'linear-gradient(to right, #fbbd04, #000000, #ffffff)',
          borderRadius: 4,
          color: '#fff',
          mb: 4,
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#fbbd04' }}>
          Welcome Admin!
        </Typography>
        <Typography variant="h6" sx={{ mt: 1 }}>
          Manage your platform efficiently and stay informed.
        </Typography>
      </Box>

      {/* Stats Section */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="30vh">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={2.4}>
            <StatCard
              icon={<AdminPanelSettingsIcon sx={{ fontSize: 40, color: '#fbbd04' }} />}
              title="Admin Name"
              value={stats?.adminName || 'Prajwal Mathapati'}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <StatCard
              icon={<GroupIcon sx={{ fontSize: 40, color: '#fbbd04' }} />}
              title="Total Users"
              value={stats?.totalUsers || 0}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <StatCard
              icon={<DirectionsCarIcon sx={{ fontSize: 40, color: '#fbbd04' }} />}
              title="Total Vehicles"
              value={stats?.totalVehicles || 0}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <StatCard
              icon={<EventNoteIcon sx={{ fontSize: 40, color: '#fbbd04' }} />}
              title="Total Bookings"
              value={stats?.totalBookings || 0}
            />
          </Grid>
         
        </Grid>
      )}

      {/* Description Section */}
      <Box sx={{ mt: 6, mx: { xs: 1, md: 10 }, p: 3, backgroundColor: '#fff', borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1a1a1a' }}>
          Dashboard Overview
        </Typography>
        <Typography variant="body1" sx={{ color: '#444', lineHeight: 1.8 }}>
          This dashboard gives you full control and visibility over the Apna Gadi platform. Here's a quick overview of what you can monitor and manage:
        </Typography>
       <ul style={{ color: '#333', marginTop: '16px', paddingLeft: '20px', lineHeight: '1.8' }}>
  <li>
    <strong>Admin Info:</strong> 
     {stats?.adminName || 'Prajwal Mathapati'} - The administrator responsible for managing vehicle listings, user data, and bookings on the platform.
  </li>
  <li>
    <strong>User Management:</strong> 
    {stats?.totalUsers || 0} users on the platform. This includes active users, those who have signed up and are utilizing services to book vehicles.
  </li>
  <li>
    <strong>Vehicle Listings:</strong> 
    {stats?.totalVehicles || 0} vehicles listed for booking. These include various types of vehicles available for rent, categorized by type, model, and other features.
  </li>
  <li>
    <strong>Booking Analytics:</strong> 
    {stats?.totalBookings || 0} total bookings made. This includes all confirmed bookings, with details like date, vehicle type, and rental duration.
  </li>
</ul>


        <Typography variant="body1" sx={{ mt: 2, color: '#666' }}>
          Use this space to stay updated, make informed decisions, and ensure seamless operations across the platform.
        </Typography>
      </Box>
    </Box>
  );
};

export default AdminHome;
