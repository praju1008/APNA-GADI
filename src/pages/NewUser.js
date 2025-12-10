import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Container } from "@mui/material";
import { FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./NewUser.css"; // Import custom CSS for the page styling

const NewUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/signup", formData);
      setMessage(res.data.message);
      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      setMessage(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="new-user-container">
      <Container maxWidth="xs">
        <div className="new-user-form">
          <div className="form-header">
            <FaUserPlus className="form-icon" />
            <Typography variant="h4" className="form-title">
              Create New Account
            </Typography>
          </div>
          <form onSubmit={handleSubmit} className="form-content">
            <TextField
              label="Name"
              name="name"
              type="text"
              variant="outlined"
              fullWidth
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              fullWidth
              value={formData.email}
              onChange={(e) => {
                handleChange(e);
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(e.target.value)) {
                  setMessage("Please enter a valid email address");
                } else {
                  setMessage(""); // Clear the message if the email is valid
                }
              }}
              required
              className="form-input"
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
              className="form-input password" // Add the class here to apply custom spacing
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="submit-button" // Custom CSS class for button styling
            >
              Sign Up
            </Button>
          </form>
          {message && (
            <Typography variant="body2" className="message">
              {message}
            </Typography>
          )}
          <Typography variant="body2" sx={{ mt: 2, textAlign: "center", color: "white" }}>
            Already have an account?{" "}
            <Link to="/signin" className="signin-link" style={{ fontWeight: "bold", color: "#fbbd04" }}>
              Sign In
            </Link>
          </Typography>
        </div>
      </Container>
    </div>
  );
};

export default NewUser;
