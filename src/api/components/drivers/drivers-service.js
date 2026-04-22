const driversRepository = require('./drivers-repository');
const bookingService = require('../bookings/bookings-service');
const { hashPassword } = require('../../../utils/password');

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

async function registerDriver(email, password, fullName) {
  const existingUser = await driversRepository.getDriverByEmail(email);
  if (existingUser) {
    throw new Error('Email already exists');
  }
  const hashedPassword = await hashPassword(password);
  return driversRepository.createDriver(email, hashedPassword, fullName);
}

async function updateDriver(id, email, fullNameDriver) {
  return driversRepository.updateDriver(id, email, fullNameDriver);
}

async function changePasswordDriver(id, password) {
  return driversRepository.changePasswordDriver(id, password);
}

async function acceptBooking(driverId, bookingId) {
  const driver = await driversRepository.getDriver(driverId);

  if (!driver) {
    throw new Error('Driver not found');
  }

  if (driver.status !== 'available') {
    throw new Error('Driver is not available');
  }

  const booking = await bookingService.getBooking(bookingId);

  if (!booking || booking.status !== 'pending') {
    throw new Error('Booking not available');
  }

  const updatedBooking = await bookingService.updateBooking(
    bookingId,
    'confirmed',
    driverId,
  );

  await driversRepository.updateStatus(driverId, 'busy');
  return updatedBooking;
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
  registerDriver,
  updateDriver,
  changePasswordDriver,
  acceptBooking,
  updateStatus,
  deleteDriver,
};