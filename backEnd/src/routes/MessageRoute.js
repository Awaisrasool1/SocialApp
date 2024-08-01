const express = require('express');
const isAuthentication = require('../middleware/VerifyToken');
const {sendMessage, getMessage, deleteMessage} = require('../controllers/Chat');
const app = express.Router();

app.post('/sendMessage', isAuthentication, sendMessage);
//
app.get('/getAllMessage/:receiverId', isAuthentication, getMessage);
//
app.post('/deleteMessage', isAuthentication, deleteMessage);


module.exports = app;
