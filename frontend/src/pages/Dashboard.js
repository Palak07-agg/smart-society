// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

 // const [dashboardData, setDashboardData] = useState(null);
  const [flatStats, setFlatStats] = useState({
    total: 0,
    owned: 0,
    rented: 0,
    empty: 0
  });
const [userFlat, setUserFlat]=useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const features = [
    { title: 'Payments', icon: '💳', route: '/payments' },
    { title: 'Complaints', icon: '📝', route: '/complaints' },
    { title: 'Emergency Alerts', icon: '🚨', route: '/emergency-alerts' },
    { title: 'Visitor Tracking', icon: '🕵️‍♂️', route: '/visitor-tracking' },
    { title: 'Polling', icon: '🗳️', route: '/polling' },
    { title: 'Parking', icon: '🚗', route: '/parking' },
    { title: 'Courier Alerts', icon: '📦', route: '/courier-alerts' },
    { title: 'Language Support', icon: '🌐', route: '/language-support' }
  ];

  useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ This is crucial
        },
      });

        setFlatStats(res.data.flatStats);
        setUserFlat(res.data.flatNumber);
    } catch (err) {
      console.error('Error fetching dashboard:', err);
    }
  };

  fetchData();
}, []);




  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Welcome to Your Dashboard</h1>

      <h3>Hello, {user?.username||'User'}</h3>
      <p>Your Flat Number: {user?.houseNumber||'Flat'}</p>

      <div className="flats-box">
        <h4>Available Flats Overview</h4>
        <p>Total Flats: {flatStats.total}</p>
        <p>Owned: {flatStats.owned}</p>
        <p>Rented: {flatStats.rented}</p>
        <p>Empty: {flatStats.empty}</p>
      </div>

      <div className="dashboard-grid">
        {features.map((feature, index) => (
          <div
            key={index}
            className="dashboard-card"
            onClick={() => navigate(feature.route)}
          >
            <div className="card-icon">{feature.icon}</div>
            <div className="card-title">{feature.title}</div>
          </div>
        ))}
      </div>
    </div>
  );

};

export default Dashboard;