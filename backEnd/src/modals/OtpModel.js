const mongoose = require('mongoose');

const OptSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  verify: {
    type: Boolean,
    required: true,
  },
});

const Otp = mongoose.model('OTP', OptSchema);
module.exports = Otp;
