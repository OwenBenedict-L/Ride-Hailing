const driversService = require('./drivers-service');
const { errorResponder, errorTypes } = require('../../../core/errors');
const { hashPassword, passwordMatched } = require('../../../utils/password');

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

async function registerDriver(req, res, next) {
  try {
    const {
      email,
      password,
      full_name: fullName,
    } = req.body;

    if (!email || !password || !fullName) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'All fields required'
      );
    }

    if (password.length < 8) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Password must be at least 8 characters'
      );
    }

    await driversService.registerDriver(email, password, fullName);

    return res.status(201).json({
      message: 'Driver registered successfully',
    });
  } catch (err) {
    if (err.message === 'Email already exists') {
      return next(
        errorResponder(errorTypes.EMAIL_ALREADY_TAKEN, err.message)
      );
    }
    return next(err);
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

async function changePasswordDriver(request, response, next) {
  try {
    const driverId = request.driver.id;
    const {
      old_password: oldPassword,
      new_password: newPassword,
      confirm_new_password: confirmNewPassword,
    } = request.body;

    const driver = await driversService.getDriver(driverId);
    if (!driver) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found');
    }

    const isMatch = await passwordMatched(oldPassword, driver.password);
    if (!isMatch) {
      throw errorResponder(errorTypes.UNAUTHORIZED, 'Incorrect old password');
    }

    if (newPassword.length < 8) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'New password must be at least 8 characters long'
      );
    }

    if (newPassword === oldPassword) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'New password must be different from old password'
      );
    }

    if (newPassword !== confirmNewPassword) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'New password and confirm password do not match'
      );
    }

    const hashedNewPassword = await hashPassword(newPassword);
    const success = await driversService.changePassword(
      driverId,
      hashedNewPassword
    );

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to change password'
      );
    }

    return response
      .status(200)
      .json({ message: 'Password changed successfully' });
  } catch (error) {
    return next(error);
  }
}

async function updateStatus(request, response, next) {
  try {
    const { status } = request.body;
    await driversService.updateStatus(request.params.id, status);
    return response.status(200).json({ message: 'Status driver has been updated', status });
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
  registerDriver,
  updateDriver,
  changePasswordDriver,
  updateStatus,
  deleteDriver,
};
