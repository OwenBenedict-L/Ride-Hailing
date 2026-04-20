const { Users } = require('../../../models');

async function getUsers() {
  return Users.find({});
}

async function getUser(id) {
  return Users.findById(id);
}

async function getUserByEmail(email) {
  return Users.findOne({ email });
}

async function createUser(email, password, fullName) {
  return Users.create({ email, password, fullName });
}

async function updateUser(id, email, fullName) {
  return Users.updateOne({ _id: id }, { $set: { email, fullName } });
}

async function updateProfile(id, phoneNumber, profilePicture) {
  return Users.updateOne(
    { _id: id },
    { $set: { phone_number: phoneNumber, profile_picture: profilePicture } }
  );
}

async function changePassword(id, password) {
  return Users.updateOne({ _id: id }, { $set: { password } });
}

async function deleteUser(id) {
  return Users.deleteOne({ _id: id });
}

module.exports = {
  getUsers,
  getUser,
  getUserByEmail,
  createUser,
  updateUser,
  updateProfile,
  changePassword,
  deleteUser,
};
