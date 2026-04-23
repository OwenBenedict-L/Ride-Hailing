const authentication = require('./authentication');

module.exports = {
  authMiddleware: authentication.authMiddleware,
  authMidDriver: authentication.authMidDriver,
};