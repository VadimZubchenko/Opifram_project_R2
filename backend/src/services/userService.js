const User = require('../models/userModel');
const { toUser, toUserEntry } = require('../utils');
const bcrypt = require('bcrypt');

const getUsers = async () => {
  const users = await User.find({});
  return users.map((user) => toUser(user));
};

const getUser = async (id) => {
  const user = await User.findById(id);
  return toUser(user);
};

//Remove this before production
const createUser = async (data) => {
  const userEntry = toUserEntry(data);
  userEntry.role = data.role;
  const hashedPassword = await bcrypt.hash(userEntry.password, 12);
  userEntry.password = hashedPassword;
  const createdUser = new User(userEntry);
  const savedUser = await createdUser.save();
  return toUser(savedUser);
};

const updateUser = async (id, data) => {
  const userData = toUserEntry(data);
  const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });
  return toUser(updatedUser);
};

const deleteUser = async (id) => {
  const deletedUser = await User.findByIdAndDelete(id);
  return toUser(deletedUser);
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser
};
