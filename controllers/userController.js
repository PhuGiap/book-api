const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await userModel.getUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.createUser({ name, email, password: hashedPassword, role });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.getUserByEmail(email);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  const users = await userModel.getAllUsers();
  res.json(users);
};

exports.getUser = async (req, res) => {
  const user = await userModel.getUserById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

exports.updateUser = async (req, res) => {
  const user = await userModel.updateUser(req.params.id, req.body);
  res.json(user);
};

exports.deleteUser = async (req, res) => {
  await userModel.deleteUser(req.params.id);
  res.json({ message: 'User deleted' });
};
