// routes/dashboard.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');

router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    

    // Fetch all users
    const users = await User.find();  // ✅ You missed this line earlier

    // Count different types
    const owned = users.filter(u => u.ownership?.toLowerCase().trim() === 'owned').length;
    const rented = users.filter(u => u.ownership?.toLowerCase().trim() === 'rented').length;
    const total = users.length;
    const empty = total - (owned + rented);  // Or however you define empty

    const currentUser = users.find(u => u._id.toString() === userId);

    res.json({
      flatStats: { total, owned, rented, empty },
      flatNumber: currentUser?.houseNumber || ''
    });

  } catch (err) {
    console.error('Dashboard route error:', err.message);
    res.status(500).json({ message: 'Server error in dashboard route' });
  }
});

module.exports = router;
