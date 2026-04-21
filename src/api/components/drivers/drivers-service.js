const driversRepository = require('./drivers-repository');
const bookingService = require('../bookings/bookings-service');

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
  updateDriver,
  changePasswordDriver,
  acceptBooking,
  updateStatus,
  deleteDriver,
};