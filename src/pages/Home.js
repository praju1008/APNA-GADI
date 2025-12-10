import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { FaUserPlus, FaSignInAlt, FaMotorcycle } from 'react-icons/fa';
import bgImage from '../assets/bg.png'; // ✅ Add this line

const Home = () => {
  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#333', // Fallback background color
        height: '100vh', // Ensure the container takes full viewport height
        overflow: 'hidden', // Prevent scrolling
      }}
    >
      <div className="home-overlay">
        <div className="home-header">
          <FaMotorcycle className="home-icon" />
          <h1>Apna Gadi</h1>
        </div>
        <p className="home-subtext">
          Discover historic destinations and rent vehicles easily with our trusted platform.
        </p>
        <div className="home-buttons">
          <Link to="/newuser" className="home-btn" aria-label="Create an account">
            <FaUserPlus className="btn-icon" /> Create an Account
          </Link>
          <Link to="/signin" className="home-btn secondary" aria-label="Sign In">
            <FaSignInAlt className="btn-icon" /> Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
