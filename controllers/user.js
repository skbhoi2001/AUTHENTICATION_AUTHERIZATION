const User = require('../models/user');
const EmailVerificationToken = require('../models/EmailVerificationToken');
const nodemailer = require('nodemailer');

exports.create = async (req, res) => {
  const { name, email, password } = req.body;

  const oldUser = await User.findOne({ email });

  if (oldUser)
    return res.status(401).json({ error: 'This email is already in use!' });

  const newUser = new User({ name, email, password });
  await newUser.save();

  // Generate 6 digit otp

  let OTP = '';
  for (let i = 0; i <= 5; i++) {
    const randomVal = Math.round(Math.random() * 9);
    OTP += randomVal;
  }

  // Store at db

  const newEmailVerificationToken = new EmailVerificationToken({
    owner: newUser._id,
    token: OTP,
  });

  await newEmailVerificationToken.save();

  // send to the user

  var transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'b43110878406fc',
      pass: '833448aa04fbf2',
    },
  });
  transport.sendMail({
    from: 'Verification@reviewapp.com',
    to: newUser.email,
    subject: 'Email verification',
    html: `
      <p>Your Verification token</p>
      <h1>${OTP}</h1>
    `,
  });

  res.status(201).json({ message: 'Otp has been sent please verify' });
};
