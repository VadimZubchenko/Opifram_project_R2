const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = require('./config');
const { errorDefinitions } = require('./errorDefinitions');
const { throwError } = require('./utils');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const errorName = err.name;
  const errorMessage = err.message;
  const foundError = errorDefinitions.find(e => e.name === errorName);

  if (foundError) {
    console.error(foundError.stackTrace ? err.stack : `${err.name}: ${err.message}`);
    if (foundError.resJson) {
      return res.status(foundError.status).json({ [errorName]: errorMessage });
    } else {
      return res.sendStatus(foundError.status);
    }
  } else {
    //All unexpected, not explicitly handled errors
    console.error(`Unexpected error: ${err}`, err.stack);
    return res.sendStatus(500);
  }
};

const unknownEndpoint = (req) => {
  throwError('UnknownEndpointError', `Route ${req.originalUrl} not found. Maybe typo?`);
};

//Get token from Authorization header, extract it to get user id and role
//Set user id and role to req object
const extractToken = (req, res, next) => {
  const token = req.get('Authorization')?.split(' ')[1];
  const secret = ACCESS_TOKEN_SECRET;

  if (!token) {
    throwError('NoTokenError', 'No token found');
  } else {
    const payload = jwt.verify(token, secret);
    if (!payload) {
      throwError('TokenValidationError', 'Token validation failed');
    } else {
      req.userId = payload.user.id;
      req.userRole = payload.user.role;
      next();
    }
  }

};

//Very simple request logger
const requestLogger = (req, res, next) => {
  console.log(req.method, req.originalUrl, res.statusCode);
  next();
};

module.exports = { errorHandler, unknownEndpoint, extractToken, requestLogger };