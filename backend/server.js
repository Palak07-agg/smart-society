const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const authMiddleware = require('./middleware/auth');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);

// ✅ Public Routes
app.use('/api/auth', authRoutes);

// ✅ Protected Routes
const dashboardRoute = require('./routes/dashboard');
app.use('/api/dashboard', authMiddleware, dashboardRoutes);
const paymentRoutes = require('./routes/payment');
app.use('/api/payment', paymentRoutes);
const complaintRoutes = require('./routes/complaints');
app.use('/api/complaints', complaintRoutes);

// ✅ Connect to MongoDB and Start Server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    app.listen(process.env.PORT, () => console.log(`🚀 Server running at http://localhost:${process.env.PORT}`));
  })
  .catch(err => console.error('❌ MongoDB connection failed:', err));
