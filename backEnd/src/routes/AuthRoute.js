const express = require('express');
const {SignIn, SignUp, sendOtp, getProfile, getAllUser} = require('../controllers/Auth');
const singleAvater = require('../middleware/Multer');
const isAuthentication = require('../middleware/VerifyToken');
const app = express.Router();

app.post('/SignUp', singleAvater, SignUp);
//
app.post('/SignIn', SignIn);
//
app.post('/Otp', sendOtp);
//
app.get('/GetProfile', isAuthentication, getProfile);
//
app.get('/GetAllUser', isAuthentication, getAllUser);
//

module.exports = app;
