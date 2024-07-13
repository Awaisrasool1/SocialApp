const express = require('express');
const {SignIn, SignUp, sendOtp} = require('../controllers/Auth');
const singleAvater = require('../middleware/Multer');
const app = express.Router();

app.post('/SignUp', singleAvater, SignUp);
app.post('/SignIn', SignIn);
app.post('/Otp', sendOtp);


module.exports = app;
