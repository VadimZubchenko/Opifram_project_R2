const User = require('../models/userModel');
const { toLoginCredentials, throwError, toUser, toUserEntry, toAccessTokenData } = require('../utils');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRATION_TIME } = require('../config');

const login = async (credentials) => {
  const creds = toLoginCredentials(credentials);

  const userByEmail = await User.findOne({ email: creds.email });
  if (!userByEmail) {
    throwError('WrongCredentialsError', 'Invalid email or password');
  }

  const match = await bcrypt.compare(creds.password, userByEmail.password);
  if (!match) {
    throwError('WrongCredentialsError', 'Invalid email or password');
  }

  const token = jwt.sign({ user: toAccessTokenData(userByEmail) }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRATION_TIME });
  return { token: token, user: toUser(userByEmail) };
};

const register = async (data) => {
  const userEntry = toUserEntry(data);

  const user = await User.findOne({ email: userEntry.email });
  if (user) {
    throwError('EmailAlreadyInUseError', `Email ${userEntry.email} is already in use`);
  }

  const email = userEntry.email;
  const password = userEntry.password;

  userEntry.password = await bcrypt.hash(userEntry.password, 12);

  const newUser = new User(userEntry);
  await newUser.save();

  const loggedUser = await login({ email: email, password: password });
  return loggedUser;
};

module.exports = {
  login,
  register
};