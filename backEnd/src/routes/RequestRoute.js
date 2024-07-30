const express = require('express');
const {
  sendFriendRequest,
  acceptFriendRequest,
  getAllfriends,
  getNonFriends,
} = require('../controllers/Request');
const isAuthentication = require('../middleware/VerifyToken');
const app = express.Router();

app.post('/sendrequest', isAuthentication, sendFriendRequest);
//
app.put('/accept', isAuthentication, acceptFriendRequest);
//
app.get('/allFriend', isAuthentication, getAllfriends);
//
app.get('/GetNonFriend', isAuthentication, getNonFriends);

module.exports = app;
