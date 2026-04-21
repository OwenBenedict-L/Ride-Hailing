const { driversService } = require('./drivers-service');
const { errorResponder, errorTypes } = require('../../../core/errors');
const { hashPassword } = require('../../../utils/password');

async function getDrivers(request, response, next) {
  try {
    const drivers = await driversService.getDrivers();

    return response.status(200).json(drivers);
  } catch (error) {
    return next(error);
  }
}

async function getDriver(request, response, next) {
  try {
    const driver = await driversService.getDriver(request.params.id);

    if (!driver) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Error! Account is not registered!'
      );
    }

    return response.status(200).json(driver);
  } catch (error) {
    return next(error);
  }
}

async function createDriver(request, response, next) {
  try {
    const {
      email,
      password,
      full_name: fullNameDriver,
      confirm_password: confirmPassword,
    } = request.body;

    if (!email) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Email needed!');
    }

    if (!fullNameDriver) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Full Name needed!'
      );
    }

    if (await driversService.emailExists(email)) {
      throw errorResponder(
        errorTypes.EMAIL_ALREADY_TAKEN,
        'Email has already been used!'
      );
    }

    if (password.length < 8) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Password must have minimal 8 characters long!'
      );
    }

    if (password !== confirmPassword) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Password and confirm password is not the same!'
      );
    }

    const hashedPassword = await hashPassword(password);

    const success = await driversService.createUser(
      email,
      hashedPassword,
      fullNameDriver
    );

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Unable to log'
      );
    }

    return response
      .status(201)
      .json({ message: 'User successfully created, welcome Driver!!!' });
  } catch (error) {
    return next(error);
  }
}

async function updateDriver(request, response, next) {
  try {
    const { email, full_name: fullNameDriver } = request.body;

    const driver = await driversService.getDriver(request.params.id);
    if (!driver) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Error, account is not registered!'
      );
    }

    if (!email) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Email is needed!');
    }

    if (!fullNameDriver) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Full Name is needed!'
      );
    }

    if (email !== driver.email && (await driversService.emailExists(email))) {
      throw errorResponder(
        errorTypes.EMAIL_ALREADY_TAKEN,
        'Email has already been registered'
      );
    }

    const success = await driversService.updateDriver(
      request.params.id,
      email,
      fullNameDriver
    );

    if (!success) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed!');
    }

    return response.status(200).json({ message: 'Changes completed!' });
  } catch (error) {
    return next(error);
  }
}

async function updateStatus(request, response, next) {
  try {
    const { status } = request.body;
    await driversService.updateStatus(request.params.id, status);
    return response.status(200).json({ message: 'Status driver: ', status });
  } catch (error) {
    return next(error);
  }
}

async function deleteDriver(request, response, next) {
  try {
    const success = await driversService.deleteDriver(request.params.id);

    if (!success) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Gagal terhapus!');
    }

    return response.status(200).json({ message: 'Akun telah dihapus' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getDrivers,
  getDriver,
  createDriver,
  updateDriver,
  updateStatus,
  deleteDriver,
};
