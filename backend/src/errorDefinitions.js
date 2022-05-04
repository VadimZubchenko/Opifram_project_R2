//Own error definitions which are handled correctly in middleware function errorHandler
const errorDefinitions = [
  { name: 'ValidationError', status: 400, resJson: true, stackTrace: false },
  { name: 'UnknownEndpointError', status: 404, resJson: true, stackTrace: false },
];

module.exports = { errorDefinitions };