const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (userData) => {
  const { full_name, username, email, contact, address, password, userType } = userData;

  const userExists = await User.findOne({ $or: [{ email }, { username }] });
  if (userExists) {
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    fullName: full_name,
    username,
    email,
    contact,
    address,
    password: hashedPassword,
    userType: userType || 'PATIENT'
  });

  return {
    user_id: user._id,
    full_name: user.fullName,
    username: user.username,
    email: user.email,
    userType: user.userType,
    token: generateToken(user._id)
  };
};

const loginUser = async (username, password) => {
  const user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    return {
      user_id: user._id,
      full_name: user.fullName,
      username: user.username,
      email: user.email,
      user_type: user.userType,
      token: generateToken(user._id)
    };
  } else {
    throw new Error('Invalid username or password');
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  registerUser,
  loginUser
};
