const authService = require('./auth-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function loginDriver(request, response, next) {
    try {
        const { email, password } = request.body;

        const loginResult = await authService.checkLoginDriver(
            email,
            password
        );

        if (!loginResult) {
            throw errorResponder(
                errorTypes.INVALID_CREDENTIALS,
                'Email atau password salah'
            );
        }

        return response
            .status (200)
            .json(loginResult);
    } catch (error) {
        return next(error);
    }
}

async function testProtectedDriver(request, response, next) {
    try {
        return response.status(200).json({ message: 'OK' });
    } catch (error) {
        return next(error);
    }
}

module.exports = { 
    loginDriver,
    testProtectedDriver
};