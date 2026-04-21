const authService = require('./auth-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function register(request, response, next) {
  try {
    const {
      email,
      password,
      full_name: fullName,
      confirm_password: confirmPassword,
    } = request.body;

    if (!email || !fullName) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Email and Full Name are required'
      );
    }

    if (password.length < 8) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Password must be at least 8 characters long'
      );
    }

    if (password !== confirmPassword) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Password and confirm password do not match'
      );
    }

    const success = await authService.register(email, password, fullName);

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to register user'
      );
    }

    return response
      .status(201)
      .json({ message: 'User registered successfully' });
  } catch (error) {
    if (error.message === 'Email already exists') {
      return next(
        errorResponder(errorTypes.EMAIL_ALREADY_TAKEN, error.message)
      );
    }
    return next(error);
  }
}

async function login(request, response, next) {
  try {
    const { email, password } = request.body;

    const loginResult = await authService.checkLogin(email, password);

    if (!loginResult) {
      throw errorResponder(
        errorTypes.INVALID_CREDENTIALS,
        'Wrong email or password'
      );
    }

    return response.status(200).json(loginResult);
  } catch (error) {
    return next(error);
  }
}

async function testProtected(request, response, next) {
  try {
    return response.status(200).json({ message: 'OK' });
  } catch (error) {
    return next(error);
  }
}

module.exports = { login, testProtected, register };
