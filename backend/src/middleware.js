const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = require('./config');
const errorDefinitions = require('./errorDefinitions');
const { throwError } = require('./utils');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const errorName = err.name;
  const errorMessage = err.message;
  const errorDef = errorDefinitions.find(e => e.name === errorName);

  if (errorDef) {
    console.error(errorDef.stackTrace ? err.stack : `${err.name}: ${err.message}`);
    if (errorDef.resJson) {
      return res.status(errorDef.status).json({ [errorName]: errorMessage });
    } else {
      return res.sendStatus(errorDef.status);
    }
  } else {
    console.error(`Unexpected error: ${err}`, err.stack);
    return res.sendStatus(500);
  }
};

const unknownEndpoint = (req) => {
  throwError('UnknownEndpointError', `Route ${req.originalUrl} not found.`);
};

//TODO: Access control, for example https://www.npmjs.com/package/accesscontrol
//TODO: Validator? https://www.npmjs.com/package/express-validator

//If 403 returned, require new login in frontend
const extractToken = (req, res, next) => {
  const secret = ACCESS_TOKEN_SECRET;
  const bearer = req.get('Authorization');
  let token;

  if (bearer) {
    token = bearer.split(' ')[1];
  }

  if (!token) {
    throwError('TokenVerifyError', 'No token found');
  }

  try {
    const payload = jwt.verify(token, secret);
    req.userId = payload.user.id;
    req.userRole = payload.user.role;
    next();
  } catch(error) {
    if (error.name === 'TokenExpiredError') {
      throwError('TokenExpiredError', 'Token expired');
    }
    throwError('TokenVerifyError', 'Token verify failed');
  }
};

//TODO: Pino? https://www.npmjs.com/package/express-pino-logger
const requestLogger = (req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
};

module.exports = {
  errorHandler,
  unknownEndpoint,
  extractToken,
  requestLogger
};