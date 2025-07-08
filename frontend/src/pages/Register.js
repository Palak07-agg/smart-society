import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Optional CSS for styling

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const [houseNumber, setHouseNumber] = useState('');
const [ownership, setOwnership] = useState('Owned'); // or 'Rented'


  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password, houseNumber,
      ownership
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        alert('✅ Registered successfully!');
        navigate('/dashboard');
      } else {
        alert('❌ Registration failed: No token received');
      }

    } catch (error) {
      console.error('❌ Registration Error:', error.response?.data || error.message);
      alert('Server error during registration. Check console for details.');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
<input
  type="text"
  placeholder="Flat/House Number"
  value={houseNumber}
  onChange={(e) => setHouseNumber(e.target.value)}
  required
/>

<select value={ownership} onChange={(e) => setOwnership(e.target.value)} required>
  <option value="Owned">Owned</option>
  <option value="Rented">Rented</option>
</select>



        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <span onClick={() => navigate('/login')} className="link">Login here</span></p>
    </div>
  );
};

export default Register;

