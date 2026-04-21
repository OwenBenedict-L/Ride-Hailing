const bookingRepository = require('./bookings-repository');
const notificationsService = require('../notifications/notifications-service');
const estimationService = require('../estimations/estimations-service.js');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getHistory(userId) {
  return bookingRepository.getHistory(userId);
}

async function getActives(userId) {
  return bookingRepository.getActives(userId);
}

async function getBooking(id) {
  return bookingRepository.getBooking(id);
}

async function createBooking(
  userId,
  pickupLocation,
  destinationLocation,
  fare,
  distance
) {
  const estimation = await estimationService.calculateEstimation(
    pickupLocation,
    destinationLocation
  );
  const activeBookings = await bookingRepository.getActives(userId);
  if (activeBookings.length > 0) {
    throw errorResponder(
      errorTypes.VALIDATION_ERROR,
      'You still have an active booking, please complete or cancel it first.'
    );
  }

  const booking = await bookingRepository.createBooking({
    userId,
    pickupLocation,
    destinationLocation,
    fare: estimation.fare,
    distance: estimation.distance,
    status: 'pending',
  });

  if (booking) {
    await notificationsService.createNotification(
      userId,
      'Booking Created',
      'The system is looking for a driver for you, please wait a moment.',
      'booking_info'
    );
  }

  return booking;
}

async function updateBooking(id, status, driverId) {
  const currentBooking = await bookingRepository.getBooking(id);
  if (!currentBooking) {
    throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Booking not found');
  }

  const updated = await bookingRepository.updateBooking(id, {
    status,
    driverId,
  });

  if (updated) {
    let notifTitle = '';
    let notifMessage = '';

    if (status === 'confirmed') {
      notifTitle = 'Driver Found!';
      notifMessage = 'Your driver is on the way to your pickup location.';
    } else if (status === 'completed!') {
      notifTitle = 'Order Completed';
      notifMessage = 'Your trip has been completed successfully. Thank you!';
    }

    if (notifTitle) {
      await notificationsService.createNotification(
        currentBooking.userId,
        notifTitle,
        notifMessage,
        'booking_info'
      );
    }
  }

  return updated;
}

async function deleteBooking(id) {
  return bookingRepository.deleteBooking(id);
}

module.exports = {
  getHistory,
  getActives,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
};
