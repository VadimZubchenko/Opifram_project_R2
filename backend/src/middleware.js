const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = require('./config');
const { errorDefinitions } = require('./errorDefinitions');
const { throwError } = require('./utils');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const errorName = err.name;
  const errorMessage = err.message;

  let foundError;

  for (const errorDef of errorDefinitions) {
    if (errorDef.name === errorName) {
      foundError = errorDef;
      break;
    }
  }

  if (foundError) {
    console.error(foundError.stackTrace ? err.stack : `${err.name}: ${err.message}`);

    if (foundError.resJson) {
      return res.status(foundError.status).json({ [errorName]: errorMessage });
    } else {
      return res.sendStatus(foundError.status);
    }

  } else {
    //All unexpected, not explicitly handled errors
    console.error(`Unexpected error: ${err}`);
    console.error('Stack:', err.stack);
    return res.sendStatus(500);
  }
};

const unknownEndpoint = (req) => {
  throwError('UnknownEndpointError', `Route ${req.originalUrl} not found. Maybe typo?`);
};

const extractToken = (req, res, next) => {
  const token = req.get('Authorization')?.split(' ')[1];
  const secret = ACCESS_TOKEN_SECRET;

  if (!token) {
    throwError('NoTokenError', 'No token found');
  } else {
    const payload = jwt.verify(token, secret);
    console.log('Payload:', payload);
    if (!payload) {
      throwError('TokenValidationError', 'Token validation failed');
    } else {
      req.userId = payload.user.id;
      req.userRole = payload.user.role;
      next();
    }
  }

};

module.exports = { errorHandler, unknownEndpoint, extractToken };