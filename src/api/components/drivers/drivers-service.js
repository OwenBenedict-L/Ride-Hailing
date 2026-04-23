const driversRepository = require('./drivers-repository');
const bookingService = require('../bookings/bookings-service');
const { hashPassword } = require('../../../utils/password');
const notificationsService = require('../notifications/notifications-service');

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
  const newDriver = await driversRepository.createDriver(email, hashedPassword, fullName);

  if (newDriver) {
    await notificationsService.createNotification(
      newDriver._id.toString(),
      'Welcome, Driver!',
      `Hi ${fullName}, your driver account has been registered!`,
      'system'
    );
  }
  return newDriver;
}

async function updateDriver(id, email, fullNameDriver) {
  return driversRepository.updateDriver(id, email, fullNameDriver);
}

async function changePasswordDriver(id, password) {
  return driversRepository.changePasswordDriver(id, password);
}

async function getDriverStatus(driverId) {
  const driver = await driversRepository.getDriver(driverId);
  if (!driver) throw new Error('Driver not found');

  if (!driver.activeBookingId) {
    return {
      status: 'available',
      booking: null,
    };
  }

  const booking = await bookingService.getBooking(driver.activeBookingId);

  if (!booking) {
    return {
      status: driver.status,
      booking: null,
    };
  }

  return {
    status: booking.status,
    booking,
  };
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
  getDriverStatus,
  deleteDriver,
};