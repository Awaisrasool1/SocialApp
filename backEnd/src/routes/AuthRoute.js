const express = require('express');
const {
  SignIn,
  SignUp,
  sendOtp,
  getProfile,
  getAllUser,
  uploadFile,
} = require('../controllers/Auth');
const singleAvater = require('../middleware/Multer');
const isAuthentication = require('../middleware/VerifyToken');
const app = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: './temp',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploadMulter = multer({storage: storage});

//
app.post('/uploadFile', uploadMulter.single('file'), uploadFile);
//
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
