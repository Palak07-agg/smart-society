const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

// Get all complaints
router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching complaints' });
  }
});

// Add a new complaint
router.post('/', async (req, res) => {
  try {
    const { name, houseNumber, complaintText } = req.body;
    const newComplaint = new Complaint({ name, houseNumber, complaintText });
    await newComplaint.save();
    res.status(201).json(newComplaint);
  } catch (err) {
    res.status(500).json({ message: 'Error creating complaint' });
  }
});

module.exports = router;
