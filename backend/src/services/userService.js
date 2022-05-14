const User = require('../models/userModel');
const { toUser, toUserEntry } = require('../utils');

const getUsers = async () => {
  const users = await User.find({});
  return users.map((user) => toUser(user));
};

const getUser = async (id) => {
  const user = await User.findById(id);
  return toUser(user);
};

const createUser = async (data) => {
  const userEntry = toUserEntry(data);
  userEntry.role = data.role;
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
