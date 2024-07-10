const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,

      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      public_Id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('Users', UserSchema);

module.exports = User;
