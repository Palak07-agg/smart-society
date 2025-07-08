const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ✅ REGISTER ROUTE
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, houseNumber, ownership } = req.body;
    

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (!username || !email || !password || !houseNumber || !ownership)
      return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    

    // Save user to DB
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      houseNumber,
      ownership
    });

    const savedUser = await newUser.save();
    

    // Generate JWT
    const token = jwt.sign(
      { id: savedUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      token,
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        houseNumber: savedUser.houseNumber,
        ownership: savedUser.ownership
      }
    });

  } catch (err) {
    console.error('❌ Registration Error:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
});


// ✅ LOGIN ROUTE
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;


    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, user: {
      id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      houseNumber: existingUser.houseNumber,
      ownership: existingUser.ownership,
    }});

  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
});

module.exports = router;

