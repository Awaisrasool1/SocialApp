const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  imageUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Posts = mongoose.model('Posts', postSchema);
module.exports = Posts;
