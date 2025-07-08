// src/pages/Payments.js
import React, { useState } from 'react';
import './Payments.css';
import axios from 'axios';

const Payments = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    houseNumber: '',
    amount: '',
    paymentType: '',
  });

  const [paymentLink, setPaymentLink] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/payment/create-order', formData);
      setPaymentLink(res.data.payment_url); // Assuming your backend sends a Razorpay payment URL or QR
    } catch (err) {
      console.error(err);
      setError('Failed to create payment order. Please try again.');
    }
  };

  return (
    <div className="payment-container">
      <h2>Make a Payment</h2>
      <form onSubmit={handleSubmit} className="payment-form">
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
        <input type="text" name="houseNumber" placeholder="House Number" value={formData.houseNumber} onChange={handleChange} required />
        <input type="number" name="amount" placeholder="Amount (₹)" value={formData.amount} onChange={handleChange} required />

        <select name="paymentType" value={formData.paymentType} onChange={handleChange} required>
          <option value="">Select Payment Type</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Rent">Rent</option>
          <option value="Fine">Fine</option>
        </select>

        <button type="submit" className="pay-button">Proceed to Pay</button>
        {error && <p className="error">{error}</p>}
      </form>

      {paymentLink && (
        <div className="payment-success">
          <p>Scan the QR or click the button to pay:</p>
          <a href={paymentLink} target="_blank" rel="noopener noreferrer">
            <button className="pay-now">Pay Now</button>
          </a>
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://example.com" alt="QR Code" />
        </div>
      )}
    </div>
  );
};

export default Payments;
