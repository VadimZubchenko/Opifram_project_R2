const errorDefinitions = [
  { name: 'TypeError', status: 400, resJson: false, stackTrace: true },
  { name: 'CastError', status: 400, resJson: false, stackTrace: true },
  { name: 'ValidationError', status: 400, resJson: true, stackTrace: false },
  { name: 'UnknownEndpointError', status: 404, resJson: true, stackTrace: false },
  { name: 'EmailAlreadyInUseError', status: 409, resJson: true, stackTrace: false },
  { name: 'UserNotFoundError', status: 404, resJson: true, stackTrace: false },
  { name: 'WrongCredentialsError', status: 401, resJson: true, stackTrace: false },
  { name: 'TokenVerifyError', status: 403, resJson: true, stackTrace: false },
  { name: 'TokenExpiredError', status: 419, resJson: true, stackTrace: false },
  { name: 'AccessDeniedError', status: 403, resJson: true, stackTrace: false }
];

module.exports = errorDefinitions;