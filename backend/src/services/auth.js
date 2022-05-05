const User = require('../models/user');
const { toLoginCredentials, throwError, toLoggedUser, toUser, toUserEntry } = require('../utils');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = require('../config');

const login = async (credentials) => {
  const creds = toLoginCredentials(credentials);

  //Find user
  const userByEmail = await User.findOne({ email: creds.email });
  if (!userByEmail) {
    throwError('UserNotFoundError', `User not found by email ${creds.email}`);
  }

  //Check password
  const match = await bcrypt.compare(creds.password, userByEmail.password);
  if (!match) {
    throwError('WrongCredentialsError', 'Invalid password');
  }

  //Return token and user object
  const token = jwt.sign({ user: toLoggedUser(userByEmail) }, ACCESS_TOKEN_SECRET);
  return { token: token, user: toUser(userByEmail) };
};

const register = async (data) => {
  const userEntry = toUserEntry(data);

  //For login
  const email = userEntry.email;
  const password = userEntry.password;

  //Check if there is already an user with same email
  const user = await User.findOne({ email: userEntry.email });
  if (user) {
    throwError('EmailAlreadyInUseError', `Email ${userEntry.email} is already in use`);
  }

  userEntry.password = await bcrypt.hash(userEntry.password, 10);

  const newUser = new User(userEntry);
  await newUser.save();

  const loggedUser = await login({ email: email, password: password });
  return loggedUser;
};

module.exports = { login, register };