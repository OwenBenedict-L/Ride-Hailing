const usersService = require('./users-service');
const { errorResponder, errorTypes } = require('../../../core/errors');
const { hashPassword, passwordMatched } = require('../../../utils/password');

function formatUserResponse(user) {
  const formatted = user.toObject ? user.toObject() : user;

  delete formatted.__v;

  return formatted;
}

async function getUsers(request, response, next) {
  try {
    const users = await usersService.getUsers();

    // Format setiap user di dalam array
    const formattedUsers = users.map(formatUserResponse);

    return response.status(200).json(formattedUsers);
  } catch (error) {
    return next(error);
  }
}

async function getUser(request, response, next) {
  try {
    const user = await usersService.getUser(request.params.id);

    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found');
    }

    return response.status(200).json(user);
  } catch (error) {
    return next(error);
  }
}

async function getProfile(request, response, next) {
  try {
    const user = await usersService.getUser(request.user.id);

    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found');
    }

    const { password, ...userProfile } = user._doc || user;
    return response.status(200).json(userProfile);
  } catch (error) {
    return next(error);
  }
}

async function updateUser(request, response, next) {
  try {
    const { email, full_name: fullName } = request.body;

    const user = await usersService.getUser(request.params.id);
    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found');
    }

    if (!email || !fullName) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Email and Full name are required'
      );
    }

    if (email !== user.email && (await usersService.emailExists(email))) {
      throw errorResponder(
        errorTypes.EMAIL_ALREADY_TAKEN,
        'Email already exists'
      );
    }

    const success = await usersService.updateUser(
      request.params.id,
      email,
      fullName
    );

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update user'
      );
    }

    return response.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    return next(error);
  }
}

async function updateProfile(request, response, next) {
  try {
    const { phone_number: phoneNumber, profile_picture: profilePicture } =
      request.body;
    const userId = request.user.id;

    const success = await usersService.updateProfile(
      userId,
      phoneNumber,
      profilePicture
    );

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update profile'
      );
    }

    return response
      .status(200)
      .json({ message: 'Profile updated successfully' });
  } catch (error) {
    return next(error);
  }
}

async function changePassword(request, response, next) {
  try {
    const userId = request.user.id;
    const {
      old_password: oldPassword,
      new_password: newPassword,
      confirm_new_password: confirmNewPassword,
    } = request.body;

    const user = await usersService.getUser(userId);
    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found');
    }

    const isMatch = await passwordMatched(oldPassword, user.password);
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
    const success = await usersService.changePassword(
      userId,
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

async function deleteUser(request, response, next) {
  try {
    const success = await usersService.deleteUser(request.params.id);

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete user'
      );
    }

    return response.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getUsers,
  getUser,
  getProfile,
  updateUser,
  updateProfile,
  changePassword,
  deleteUser,
};
