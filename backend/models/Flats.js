// models/Flat.js
const mongoose = require('mongoose');

const flatSchema = new mongoose.Schema({
  number: String,
  status: { type: String, enum: ['owned', 'rented', 'empty'] }
});

module.exports = mongoose.model('Flat', flatSchema);
