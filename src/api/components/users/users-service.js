const usersRepository = require('./users-repository');
const walletService = require('../wallet/wallet-service');
const notificationsService = require('../notifications/notifications-service');

async function getUsers() {
  return usersRepository.getUsers();
}

async function getUser(id) {
  return usersRepository.getUser(id);
}

async function emailExists(email) {
  const user = await usersRepository.getUserByEmail(email);
  return !!user;
}

async function createUser(email, password, fullName) {
  const newUser = await usersRepository.createUser(email, password, fullName);

  if (newUser) {
    await walletService.createWallet(newUser._id.toString());
    await notificationsService.createNotification(
      newUser._id.toString(),
      'Welcome!',
      `Hi ${fullName}, your account has been created successfully!`,
      'system'
    );
  }

  return newUser;
}

async function updateUser(id, email, fullName) {
  const updatedUser = await usersRepository.updateUser(id, email, fullName);

  if (updatedUser) {
    await notificationsService.createNotification(
      id,
      'Profile Updated',
      'Your basic information (email/name) has been successfully updated.',
      'system'
    );
  }
  return updatedUser;
}

async function updateProfile(id, phoneNumber, profilePicture) {
  const updatedProfile = await usersRepository.updateProfile(id, phoneNumber, profilePicture);

  if (updatedProfile) {
    await notificationsService.createNotification(
      id,
      'Security Alert!',
      'Your profile was recently changed.',
      'system'
    );
  }
  return updatedProfile;
}

async function changePassword(id, password) {
  const changedPassword = await usersRepository.changePassword(id, password);

  if (changedPassword) {
    await notificationsService.createNotification(
      id,
      'Password Changed!',
      'Your password has been changed.',
      'system'
    );
  }
  return changedPassword;
}

async function deleteUser(id) {
  return usersRepository.deleteUser(id);
}

module.exports = {
  getUsers,
  getUser,
  emailExists,
  createUser,
  updateUser,
  updateProfile,
  changePassword,
  deleteUser,
};
