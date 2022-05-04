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

    console.error(foundError.stackTrace ? err.stack : err.name, err.message);

    if (foundError.resJson) {
      return res.status(foundError.status).json({ [errorName]: errorMessage });
    } else {
      return res.sendStatus(foundError.status);
    }

  } else {
    //All unexpected errors
    console.error(`Unexpected error: ${err}`);
    return res.status(500).end();
  }
};

const unknownEndpoint = () => {
  throwError('UnknownEndpointError', 'Unknown enpoint');
};

module.exports = { errorHandler, unknownEndpoint };