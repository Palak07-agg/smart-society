const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  name: String,
  email: String,
  houseNumber: String,
  amount: Number,
  purpose: { type: String, enum: ['Fine', 'Maintenance', 'Rent'] },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String,
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);
