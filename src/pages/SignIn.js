import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Typography, Container, TextField, Button } from '@mui/material';
import { FaSignInAlt } from 'react-icons/fa'; // Import icon for the form header
import './SignIn.css'; // Import custom CSS for the page styling

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/signin', formData);
      const { id, name } = res.data; // Assuming the response contains `id` and `name`
      setMessage('Login successful!');
      // Store user data in localStorage for future use
      localStorage.setItem('userData', JSON.stringify({ id, name }));
      // Navigate to user dashboard and pass user data via state
      navigate('/userDashboard', { state: { id, name } });
    } catch (err) {
      // Check if the error response exists and handle it
      if (err.response) {
        console.log(err.response);
        if (err.response.status === 404) {
          setMessage('User not registered. Please register first.');
        } else {
          setMessage(err.response.data.message || 'Sign in failed');
        }
      } else {
        // Handle network or unexpected errors
        setMessage('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="sign-in-container">
      <Container maxWidth="xs">
        <div className="sign-in-form">
          <div className="form-header">
            <FaSignInAlt className="form-icon" />
            <Typography variant="h4" className="form-title">
              Sign In
            </Typography>
          </div>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
              InputLabelProps={{
                style: { color: 'white' }, // Label color
              }}
              InputProps={{
                sx: {
                  '&::placeholder': {
                    color: 'rgba(255, 255, 255, 0.7)', // Placeholder color
                  },
                  color: 'white', // Input text color
                },
              }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              fullWidth
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input"
              InputLabelProps={{
                style: { color: 'white' }, // Label color
              }}
              InputProps={{
                sx: {
                  '&::placeholder': {
                    color: 'rgba(255, 255, 255, 0.7)', // Placeholder color
                  },
                  color: 'white', // Input text color
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="submit-button"
              sx={{ mt: '25px' }} // Apply MUI margin top here
            >
              Sign In
            </Button>
          </form>
          {message && (
            <Typography variant="body2" className="message">
              {message}
            </Typography>
          )}
          <Typography variant="body2" sx={{ mt: 2, textAlign: "center", color: "white" }}>
            Not registered yet?{" "}
            <Link to="/newuser" className="register-link" style={{ fontWeight: "bold", color: "#fbbd04" }}>
              Register Here
            </Link>
          </Typography>
        </div>
      </Container>
    </div>
  );
};

export default SignIn;
