const userModel = require('../models/userModel');

const safeFormatDate = (date) =>
  date ? new Date(date).toISOString().split('T')[0] : null;

const formatUserDate = (user) => ({
  ...user,
  created_at: safeFormatDate(user.created_at),
  updated_at: safeFormatDate(user.updated_at),
});

// GET all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    const formattedUsers = users.map(formatUserDate);
    res.json(formattedUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await userModel.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(formatUserDate(user));
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST create user
exports.createUser = async (req, res) => {
  try {
    const newUser = await userModel.createUser(req.body);
    res.status(201).json(formatUserDate(newUser));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT update user
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await userModel.updateUser(req.params.id, req.body);
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.json(formatUserDate(updatedUser));
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE user
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await userModel.deleteUser(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
