const User = require('../models/user');
const { toUser, toUserEntry, hashPassword } = require('../utils');

const getUsers = async () => await User.find({});
const getUser = async (id) => await User.findById(id);

const createUser = async (data) => {
  const newUser = toUserEntry(data);
  const hashedPassword = hashPassword(newUser.password);
  newUser.password = hashedPassword;
  return await newUser.save();
};

const updateUser = async (id, data) => await User.findByIdAndUpdate(id, { ...toUser(data) }, { new: true });
const deleteUser = async (id) => await User.findByIdAndDelete(id);

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };