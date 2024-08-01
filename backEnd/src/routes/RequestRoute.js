const express = require('express');
const {
  sendFriendRequest,
  acceptFriendRequest,
  getAllfriends,
  getNonFriends,
  getPendingRequestsReceiver,
} = require('../controllers/Request');
const isAuthentication = require('../middleware/VerifyToken');
const app = express.Router();

app.post('/sendRequest', isAuthentication, sendFriendRequest);
//
app.put('/acceptRequest', isAuthentication, acceptFriendRequest);
//
app.get('/pendingRequest', isAuthentication, getPendingRequestsReceiver);
//
app.get('/allFriend', isAuthentication, getAllfriends);
//
app.get('/GetNonFriend', isAuthentication, getNonFriends);

module.exports = app;
