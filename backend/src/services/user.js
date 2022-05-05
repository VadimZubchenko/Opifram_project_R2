const User = require('../models/user');
const { toUser, toUserEntry, throwError } = require('../utils');
const bcrypt = require('bcrypt');

const getUsers = async () => {
  const users = await User.find({});
  return users.map(user => toUser(user));
};
const getUser = async (id) => {
  const user = await User.findById(id);
  return toUser(user);
};

const createUser = async (data) => {
  const userEntry = toUserEntry(data);

  //Check if there is already an user with same email
  const user = await User.findOne({ email: userEntry.email });
  if (user) {
    throwError('EmailAlreadyInUseError', `Email ${userEntry.email} is already in use`);
  }

  userEntry.password = await bcrypt.hash(userEntry.password, 10);

  const newUser = new User(userEntry);
  const savedUser = newUser.save();
  return toUser(savedUser);
};

const updateUser = async (id, data) => {
  const updatedUser = await User.findByIdAndUpdate(id, { ...toUser(data) }, { new: true });
  return toUser(updatedUser);
};
const deleteUser = async (id) => {
  const deletedUser = await User.findByIdAndDelete(id);
  return toUser(deletedUser);
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };