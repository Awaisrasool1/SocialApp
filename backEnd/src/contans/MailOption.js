const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  // host: 'gmail',
  host: 'smtp.gmail.com',
  secure: true,
  port: 465, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: 'ar30781871@gmail.com',
    pass: 'aniw mppp agcw urka',
  },
});

module.exports = {transporter};