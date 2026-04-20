const usersRepository = require('./users-repository');

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

async function updateUser(id, email, fullName) {
  return usersRepository.updateUser(id, email, fullName);
}

async function updateProfile(id, phoneNumber, profilePicture) {
  return usersRepository.updateProfile(id, phoneNumber, profilePicture);
}

async function changePassword(id, password) {
  return usersRepository.changePassword(id, password);
}

async function deleteUser(id) {
  return usersRepository.deleteUser(id);
}

module.exports = {
  getUsers,
  getUser,
  emailExists,
  updateUser,
  updateProfile,
  changePassword,
  deleteUser,
};
