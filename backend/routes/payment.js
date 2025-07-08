const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../models/Payment');
const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});

router.post('/create-order', async (req, res) => {
  const { amount, name, email, houseNumber, purpose } = req.body;

  try {
    const options = {
      amount: amount * 100, // amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    // Save to DB with pending status
    const payment = new Payment({
      name,
      email,
      houseNumber,
      amount,
      purpose,
      razorpayOrderId: order.id,
    });

    await payment.save();

    res.json({ orderId: order.id, key: process.env.RAZORPAY_KEY_ID });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ message: 'Failed to create payment order' });
  }
});

// Verification route
router.post('/verify', async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

  const body = razorpayOrderId + "|" + razorpayPaymentId;
  const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest('hex');

  if (expectedSignature === razorpaySignature) {
    await Payment.findOneAndUpdate(
      { razorpayOrderId },
      { razorpayPaymentId, razorpaySignature, status: 'Paid' }
    );
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: 'Payment verification failed' });
  }
});

module.exports = router;
