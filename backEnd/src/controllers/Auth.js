const User = require('../modals/UserModal');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET =
  'hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jdsds039[]]pou89ywe';

// User Create Api
const SignUp = async (req, res) => {
  const {username, email, password} = req.body;
  const avatar = {
    public_Id: 'sad',
    url: 'asd',
  };
  const oldUser = await User.findOne({email: email});
  if (oldUser) {
    return res.status(401).json({
      status: 'Error',
      message: 'User already exists!!',
      data: null,
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
      avatar: avatar,
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
    return res.status(401).json({
      status: 'Error',
      message: "User doesn't exists!!",
      data: null,
    });
  }
  const isPasswordValid = await bcrypt.compare(password, oldUser.password);

  if (isPasswordValid) {
    const token = jwt.sign({email: oldUser.email}, JWT_SECRET, {
      expiresIn: '1h',
    });
    if (res.status(201)) {
      return res.send({
        status: 'success',
        message: 'User Login Successfuly',
        data: {
          username: oldUser.username,
          token: token,
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

module.exports = {SignIn, SignUp};
