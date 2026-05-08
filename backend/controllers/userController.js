const userService = require('../services/userService');

const registerUser = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json({
      ...user,
      message: 'User registered successfully!',
      error: false
    });
  } catch (error) {
    res.status(400).json({ message: error.message, error: true });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userService.loginUser(username, password);
    res.json({
      ...user,
      error: false
    });
  } catch (error) {
    res.status(401).json({ message: error.message, error: true });
  }
};

module.exports = {
  registerUser,
  loginUser
};
