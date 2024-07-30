const mongoose = require('mongoose');

const FriendRequestSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined'],
    default: '',
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
});
const Request = mongoose.model('Request', FriendRequestSchema);
module.exports = Request;
