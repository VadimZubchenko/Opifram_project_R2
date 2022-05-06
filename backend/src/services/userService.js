const User = require('../models/userModel');
const { toUser } = require('../utils');

const getUsers = async () => {
  const users = await User.find({});
  return users.map(user => toUser(user));
};

const getUser = async (id) => {
  const user = await User.findById(id);
  return toUser(user);
};

const updateUser = async (id, data) => {
  const updatedUser = await User.findByIdAndUpdate(id, { ...toUser(data) }, { new: true });
  return toUser(updatedUser);
};

const deleteUser = async (id) => {
  const deletedUser = await User.findByIdAndDelete(id);
  return toUser(deletedUser);
};

module.exports = { getUsers, getUser, updateUser, deleteUser };