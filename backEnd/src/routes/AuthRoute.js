const express = require('express');
const {SignIn, SignUp} = require('../controllers/Auth');
const singleAvater = require('../middleware/Multer');
const app = express.Router();

app.post('/SignUp', singleAvater, SignUp);
app.post('/SignIn', SignIn);

module.exports = app;
