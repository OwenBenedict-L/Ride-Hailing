const bookingRepository = require('./bookings-repository');
const notificationsService = require('../notifications/notifications-service');
const estimationService = require('../estimations/estimations-service.js');
const driversRepository = require('../drivers/drivers-repository');
const walletService = require('../wallet/wallet-service'); 
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
  destinationLocation
) {
  const activeBookings = await bookingRepository.getActives(userId);
  if (activeBookings.length > 0) {
    throw errorResponder(
      errorTypes.VALIDATION_ERROR,
      'You still have an active booking, please complete or cancel it first.'
    );
  }
    const estimation = await estimationService.createEstimation(userId, {
    origin: pickupLocation,
    destination: destinationLocation,
  });

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

   if (status === 'completed' && currentBooking.status !== 'completed') {
    try {
      await walletService.payForRide(currentBooking.userId, currentBooking.fare);
    } catch (error) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        `Payment failed: ${error.message}`
      );
    }
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

      if (driverId) {
        await driversRepository.updateStatus(driverId, 'busy');
      }

    } else if (status === 'completed') {
      notifTitle = 'Order Completed';
      notifMessage = 'Your trip has been completed successfully. Thank you!';

      const finalDriverId = driverId || currentBooking.driverId;
      if (finalDriverId) {
        await driversRepository.updateStatus(finalDriverId, 'available');
      }
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
