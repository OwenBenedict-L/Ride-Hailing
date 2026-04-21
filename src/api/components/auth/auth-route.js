const express = require('express')
const authController = require('./auth-controller');
const { authMiddleware } = require('../../middlewares');

const route = express.Router();

module.exports = (app) => {
    app.use('/auth', route);

    route.post('/loginDriver', authController.loginDriver);
    route.get('/protectedDriver', authMiddleware, authController.testProtectedDriver);
};