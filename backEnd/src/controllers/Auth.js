const User = require('../modals/UserModal');
const OtpModel = require('../modals/OtpModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {transporter} = require('../contans/MailOption');
const JWT_SECRET = require('../../utils/Constant');
const Request = require('../modals/RequestModal');
const admin = require('firebase-admin');
const fs = require('fs');

// User Create Api
const SignUp = async (req, res) => {
  try {
    const {username, email, password, image, bio} = req.body;

    const oldUser = await User.findOne({email: email});
    if (oldUser) {
      return res.status(401).json({
        status: 'Error',
        message: 'email already exists!!',
        data: null,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const data = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
      image: image ? image : null,
      bio: bio,
    });
    res.status(201).json({
      status: 'success',
      message: 'User Create Successfuly',
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({status: 'error', data: error});
  }
};

//User LoginApi
const SignIn = async (req, res) => {
  const {email, password} = req.body;
  const oldUser = await User.findOne({email});
  if (!oldUser) {
    return res.status(404).json({
      status: 'Error',
      message: "User doesn't exists!!",
      data: null,
    });
  }
  const isPasswordValid = await bcrypt.compare(password, oldUser.password);
  if (isPasswordValid) {
    const token = jwt.sign({_id: oldUser._id}, JWT_SECRET, {
      expiresIn: '24h',
    });
    console.log(oldUser);
    if (res.status(201)) {
      return res.send({
        status: 'success',
        message: 'User Login Successfuly',
        data: {
          username: oldUser.username,
          token: token,
          userId: oldUser._id,
        },
      });
    } else {
      return res.send({error: 'error'});
    }
  } else {
    return res.status(401).json({
      status: 'Error',
      message: "Password doesn't match!!",
      data: null,
    });
  }
};

//send otp
const sendOtp = async (req, res) => {
  try {
    const {email} = req.body;
    const oldUser = await User.findOne({email});
    console.log(oldUser);

    // if (oldUser) {
    //   return res
    //     .status(401)
    //     .json({status: 'Error', message: 'User already exists'});
    // }
    var otp = Math.floor(1000 + Math.random() * 9000);
    const mailOptions = {
      from: 'socialApp <soicalApp.net>',
      to: 'social <socialApp.net>',
      subject: 'social OTP',
      html: `<h3 style="text-align:center;letter-spacing:18px;font-size:40px;">${otp}</h3>`,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({status: 'fail', message: 'Failed to send email.'});
      }

      const createotp = await OtpModel.create({
        email: email,
        otp: otp,
        verify: false,
      });

      res
        .status(200)
        .json({status: 'success', message: 'OTP sent to mail successfully.'});
    });
  } catch (e) {}
};

//
const getAllUser = async (req, res) => {
  try {
    const users = await User.find({_id: {$ne: req.user}});
    const friendships = await Request.find({
      $or: [{sender: req.user._id}, {receiver: req.user._id}],
      status: 'accepted',
    })
      .populate('sender', 'username')
      .populate('receiver', 'username');
    //get my friend
    let friends = friendships.map(element =>
      element.receiver._id == req.user._id
        ? element.sender._id
        : element.receiver._id,
    );
    const nonFriends = users.filter(u => console.log(friends.includes(u._id)));
    console.log(friends);

    res.status(200).json({status: 'success', data: users});
  } catch (e) {
    return res.status(500).json({status: 'fail', message: 'Failed to get all'});
  }
};

//get profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    res.status(200).json({status: 'success', data: user});
  } catch (e) {
    res.status(500).json({status: 'fail', message: 'Internal server error.'});
  }
};

//
const serviceAccount = require('../../shaenjew-firebase-adminsdk-5lymh-4262e7bca3.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://shaenjew.appspot.com',
  });
}

const bucket = admin.storage().bucket();
const uploadFile = async (req, res) => {
  console.log('req.file', req.file);
  try {
    if (!req.file) {
      return res.status(400).json({status: false, message: 'No file uploaded'});
    }

    const file = req.file;
    const fileName = `UserImages/${Date.now()}_${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    // Read the file from the temp folder
    const fileContent = fs.readFileSync(file.path);

    const blobStream = fileUpload.createWriteStream({
      metadata: {contentType: file.mimetype},
    });

    blobStream.on('error', error => {
      console.error('Error uploading to Firebase:', error);
      res.status(500).json({
        error: 'Something went wrong uploading the file: ' + error.message,
      });
    });

    blobStream.on('finish', async () => {
      await fileUpload.makePublic();
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
      fs.unlinkSync(file.path);
      console.log('publicUrl', publicUrl);
      res.status(200).json({status: true, fileUrl: publicUrl});
    });

    blobStream.end(fileContent);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({status: 'Failure', error: error.message});
  }
};

module.exports = {SignIn, SignUp, sendOtp, getProfile, getAllUser, uploadFile};
