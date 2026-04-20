const bookingsService = require('./bookings-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getHistory(request, response, next) {
  try {
    const { userId } = request.query;
    const history = await bookingsService.getHistory(userId);
    return response.status(200).json(history);
  } catch (error) {
    return next(error);
  }
}

async function getActives(request, response, next) {
  try {
    const { userId } = request.query;
    const actives = await bookingsService.getActives(userId);
    return response.status(200).json(actives);
  } catch (error) {
    return next(error);
  }
}

async function createBooking(request, response, next) {
  try {
    const { userId, pickupLocation, destinationLocation } = request.body;

    if (!userId || !pickupLocation || !destinationLocation) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Pickup and destination location are required!'
      );
    }

    const booking = await bookingsService.createBooking(
      userId,
      pickupLocation,
      destinationLocation
    );

    if (!booking) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create booking'
      );
    }

    return response.status(201).json({
      message: 'Booking created successfully!',
      data: booking,
    });
  } catch (error) {
    return next(error);
  }
}

async function updateBooking(request, response, next) {
  try {
    const { id } = request.params;
    const payload = request.body;

    const success = await bookingsService.updateBooking(id, payload);

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update booking.'
      );
    }

    return response
      .status(200)
      .json({ message: 'Booking updated successfully!' });
  } catch (error) {
    return next(error);
  }
}

async function deleteBooking(request, response, next) {
  try {
    const success = await bookingsService.deleteBooking(request.params.id);

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete booking.'
      );
    }

    return response
      .status(200)
      .json({ message: 'Booking deleted successfully!' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getHistory,
  getActives,
  createBooking,
  updateBooking,
  deleteBooking,
};
