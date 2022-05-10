/* eslint-disable no-undef */
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kahvikauppa';
const PORT = process.env.PORT || 3001;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'oZH5x7sFdtlBZo7USTXE';
const ACCESS_TOKEN_EXPIRATION_TIME = '7d'; // 7 days

module.exports = {
  MONGODB_URI,
  PORT,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRATION_TIME
};