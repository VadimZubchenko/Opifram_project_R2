const User = require('../models/user');
const { toUser } = require('../utils');

const getUsers = async () => await User.find({});
const getUser = async (id) => await User.findById(id);
const createUser = async (data) => await new User(toUser(data)).save();
const updateUser = async (id, data) => await User.findByIdAndUpdate(id, { ...toUser(data) }, { new: true });
const deleteUser = async (id) => await User.findByIdAndDelete(id);

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };