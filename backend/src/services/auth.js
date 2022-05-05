const User = require('../models/user');
const { toLoginCredentials, throwError, toLoggedUser, toUser } = require('../utils');
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

module.exports = { login };