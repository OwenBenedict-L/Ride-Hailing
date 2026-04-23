const reviewsService = require('./reviews-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getReview(request, response, next) {
  try {
    const rideId = request.params.ride_id;
    const review = await reviewsService.getReview(rideId);

    if (!review) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Review not found for this ride'
      );
    }

    return response.status(200).json(review);
  } catch (error) {
    return next(error);
  }
}

async function postReview(request, response, next) {
  try {
    const { rideId, rating, comment, userId} = request.body;

    // Ride ID is required
    if (!rideId) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Ride ID is required');
    }

    // Rating must exist and be between 1 and 5
    if (!rating || rating < 1 || rating > 5) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Rating is required and must be between 1 and 5'
      );
    }

    const savedReview = await reviewsService.submitReview(
      rideId,
      rating,
      comment,
      userId
    );

    return response.status(201).json(savedReview);
  } catch (error) {
    return next(error);
  }
}

async function putReview(request, response, next) {
  try {
    const { rideId, rating, comment, userId } = request.body;

    // Ride ID is required
    if (!rideId) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Ride ID is required');
    }

    // Rating must exist and be between 1 and 5
    if (!rating || rating < 1 || rating > 5) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Rating is required and must be between 1 and 5'
      );
    }

    const updatedReview = await reviewsService.modifyReview(
      rideId,
      rating,
      comment,
      userId
    );

    return response.status(200).json(updatedReview);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getReview,
  postReview,
  putReview,
};
