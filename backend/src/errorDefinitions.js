//Own error definitions which are handled explicitly in middleware function errorHandler
const errorDefinitions = [
  { name: 'ValidationError', status: 400, resJson: true, stackTrace: false },
  { name: 'UnknownEndpointError', status: 404, resJson: true, stackTrace: false },
  { name: 'JsonWebTokenError', status: 401, resJson: true, stackTrace: false },
  { name: 'NoTokenError', status: 401, resJson: true, stackTrace: false },
  { name: 'EmailAlreadyInUseError', status: 409, resJson: true, stackTrace: false },
  { name: 'UserNotFoundError', status: 404, resJson: true, stackTrace: false },
  { name: 'WrongCredentialsError', status: 403, resJson: true, stackTrace: false },
  { name: 'TypeError', status: 400, resJson: false, stackTrace: true },
  { name: 'CastError', status: 400, resJson: false, stackTrace: true },
];

module.exports = { errorDefinitions };