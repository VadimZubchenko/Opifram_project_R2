//Own error definitions which are handled explicitly in middleware function errorHandler
const errorDefinitions = [
  { name: 'ValidationError', status: 400, resJson: true, stackTrace: false },
  { name: 'UnknownEndpointError', status: 404, resJson: true, stackTrace: false },
  { name: 'JsonWebTokenError', status: 401, resJson: true, stackTrace: false },
  { name: 'NoTokenError', status: 401, resJson: true, stackTrace: false },
  { name: 'TypeError', status: 400, resJson: true, stackTrace: true },
];

module.exports = { errorDefinitions };