import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Complaints.css';

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    houseNumber: '',
    complaintText: ''
  });

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    const res = await axios.get('http://localhost:5000/api/complaints');
    setComplaints(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/complaints', formData);
    setFormData({ name: '', houseNumber: '', complaintText: '' });
    setShowForm(false);
    fetchComplaints();
  };

  return (
    <div className="complaints-container">
      <h2>Resident Complaints</h2>
      <button className="new-complaint-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : '➕ New Complaint'}
      </button>

      {showForm && (
        <form className="complaint-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            required
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="House Number"
            value={formData.houseNumber}
            required
            onChange={(e) => setFormData({ ...formData, houseNumber: e.target.value })}
          />
          <textarea
            placeholder="Enter your complaint..."
            value={formData.complaintText}
            required
            onChange={(e) => setFormData({ ...formData, complaintText: e.target.value })}
          ></textarea>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      )}

      <div className="complaints-list">
        {complaints.map((comp) => (
          <div key={comp._id} className="complaint-tile">
            <h4>{comp.name} - House {comp.houseNumber}</h4>
            <p>{comp.complaintText}</p>
            <small>{new Date(comp.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Complaints;
