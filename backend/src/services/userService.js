const User = require('../models/userModel');
const { toUser, toUserEntry, toUserUpdateEntry, validateStringProperty } = require('../utils');
const bcrypt = require('bcrypt');

const getUsers = async () => {
  const users = await User.find({}).sort({ createdAt: -1 });
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

const updateUser = async (id, data, requestUserRole) => {
  const userData = toUserUpdateEntry(data);

  //If user is updated from admin panel, allow changing role
  if (requestUserRole === 'admin') {
    if (data.role) {
      userData.role = data.role;
    }
  }

  const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });
  return toUser(updatedUser);
};

const deleteUser = async (id) => {
  const deletedUser = await User.findByIdAndDelete(id);
  return toUser(deletedUser);
};

const searchUsers = async (data) => {

  const searchBy = () => {
    validateStringProperty('name', data.name);
    const keys = data.name.trim().split(' ');
    const list = [];
    keys.forEach(key => {
      const regex = new RegExp(key, 'i');
      list.push({'firstName': regex}, {'lastName': regex});
    });
    return list;
  };

  const foundUsers = await User.aggregate([{$match: { $or: searchBy() }}]).sort({createdAt: -1});
  return foundUsers.map(user => toUser(user));
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser,
  searchUsers
};
