const { extractToken } = require('./middleware');
const { throwError } = require('./utils');

const checkPermission = () => {
  return async (err, req, res, next) => {
    extractToken(err, req, res, next);

    let granted = false;

    const userId = req.userId;
    const userRole = req.userRole;
    const targetId = req.params.id;

    switch(userRole) {
    case 'user':
      if (userId === targetId) {
        granted = true;
      }
      break;
    case 'admin':
      granted = true;
      break;
    default:
      granted = false;
      break;
    }

    if (!granted) {
      throwError('AccessDeniedError', 'You are not allowed to perform this action for given resource');
    }

  };
};

module.exports = checkPermission;