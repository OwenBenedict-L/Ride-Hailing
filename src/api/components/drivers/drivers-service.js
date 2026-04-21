const { driversRepository } = require('./drivers-repository');

async function getDrivers() {
  return driversRepository.getDrivers();
}

async function getDriver(id) {
  return driversRepository.getDriver(id);
}

async function emailExists(email) {
  const driver = await driversRepository.getDriverByEmail(email);
  return !!driver;
}

async function createDriver(email, password, fullNameDriver) {
  return driversRepository.createDriver(email, password, fullNameDriver);
}

async function updateDriver(id, email, fullNameDriver) {
  return driversRepository.updateDriver(id, email, fullNameDriver);
}

async function updateStatus(id, status) {
  return driversRepository.updateStatus(id, status);
}

async function deleteDriver(id) {
  return driversRepository.deleteDriver(id);
}

module.exports = {
  getDrivers,
  getDriver,
  emailExists,
  createDriver,
  updateDriver,
  updateStatus,
  deleteDriver,
};