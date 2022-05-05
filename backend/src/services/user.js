const User = require('../models/user');
const { toUser, toUserEntry, throwError } = require('../utils');
const bcrypt = require('bcrypt');

const getUsers = async () => await User.find({});
const getUser = async (id) => await User.findById(id);

const createUser = async (data) => {
  const userEntry = toUserEntry(data);

  //Check if there is already an user with same email
  const user = await User.findOne({email: userEntry.email});
  if (user) {
    throwError('EmailAlreadyInUseError', `Email ${userEntry.email} is already in use`);
  }

  userEntry.password = await bcrypt.hash(userEntry.password, 10);
  const newUser = new User(userEntry);
  return await newUser.save();
};

const updateUser = async (id, data) => await User.findByIdAndUpdate(id, { ...toUser(data) }, { new: true });
const deleteUser = async (id) => await User.findByIdAndDelete(id);

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };