
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
houseNumber:{
type:String,
required: true
}, 
ownership:   { type: String, enum: ['Owned', 'Rented'], required: true }
});

module.exports = mongoose.model('User', UserSchema);
