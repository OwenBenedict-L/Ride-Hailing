const { Drivers } = require('../../../models');

async function getDrivers() {
  return Drivers.find({});
}

async function getDriver(id) {
  return Drivers.findById(id);
}

async function createDriver(email, password, fullName) {
  return Drivers.create({ email, password, fullName });
}

async function getDriverByEmail(email) {
  return Drivers.findOne({ email });
}

async function updateDriver(id, email, fullNameDrivers) {
  return Drivers.updateOne({ _id: id }, { $set: { email, fullNameDrivers } });
}

async function changeDriverPassword(id, password) {
  return Drivers.updateOne(
    { _id: id },
    { $set: { password } }
  );
}

async function updateStatus(id, payload) {
  if (typeof payload !== 'object') {
    payload = { status: payload };
  }

  return Drivers.updateOne(
    { _id: id },
    { $set: payload },
  );
}

async function deleteDriver(id) {
  return Drivers.updateOne({ _id: id }, { 
    $set: { deleted: true, status : "OFFLINE" } }
  );
}

module.exports = {
  getDrivers,
  getDriver,
  createDriver,
  getDriverByEmail,
  updateDriver,
  changeDriverPassword,
  updateStatus,
  deleteDriver,
};