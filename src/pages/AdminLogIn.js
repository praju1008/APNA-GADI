import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Paper,
  Link
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import loginBg from '../assets/login.jpg';
import './AdminLogIn.css';

const AdminLogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      setErrorMessage('Please fill in all the details!');
    } else if (username === 'praju' && password === 'praju@123') {
      setErrorMessage('');
      navigate('/admin-home');
    } else {
      setErrorMessage('Invalid Username & password!');
    }
  };

  return (
    <Box
      className="admin-theme-container"
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper
        elevation={0} // Remove shadow for a fully transparent effect
        className="admin-theme-card"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0)', // Fully transparent background
          padding: '2rem',
          borderRadius: '10px',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <Typography variant="h4" className="admin-theme-title" style={{ textAlign: 'center', marginBottom: '1rem', color: 'white' }}>
          Admin Login
        </Typography>

        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="admin-theme-input"
          InputLabelProps={{
            style: { color: 'white' }, // Label color
          }}
          InputProps={{
            sx: {
              color: 'white', // Input text color
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white', // Border color
              },
            },
          }}
        />

        <TextField
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="admin-theme-input"
          InputLabelProps={{
            style: { color: 'white' }, // Label color
          }}
          InputProps={{
            sx: {
              color: 'white', // Input text color
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white', // Border color
              },
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" style={{ color: 'white' }}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {errorMessage && (
          <Typography color="error" mt={2} align="center">
            {errorMessage}
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, py: 1, backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
          onClick={handleLogin}
          className="admin-theme-button"
        >
          Log In
        </Button>

        <Box mt={3} textAlign="center">
          <Link href="/userDashboard" underline="hover" style={{ color: 'white' }}>
            ← Back to Home
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminLogIn;
