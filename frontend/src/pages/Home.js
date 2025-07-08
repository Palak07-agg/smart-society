import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
         <img
      src="/society-logo.png"
     
      className="logo-image"
    />
    <span className="logo-text">Green Valley Community</span>
  </div>
        <div className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/register">Sign Up</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">Welcome to Green Valley Society</h1>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>About Our Society</h2>
        <p>
          Green Valley Society is a modern residential community designed for convenience, safety, and harmony. 
          Our Smart Society Management System offers seamless bill payments, facility bookings, emergency alerts, complaint handling,
          visitor tracking, and more — all from a unified platform. Experience stress-free living with secure communication and multilingual access.
        </p>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <h2>Contact Us</h2>
        <p>📞 Secretary: +91 9876543210</p>
        <p>📧 Email: greenvalley@community.com</p>
        <p>© 2025 Green Valley Society</p>
      </section>
    </div>
  );
};

export default Home;
