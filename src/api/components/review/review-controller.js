const reviewService = require('./review-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getReview(request, response, next) {
  try {
    const rideId = request.params.ride_id;
    const review = await reviewService.getReview(rideId);

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
    const { rideId, rating, comment } = request.body;

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

    const savedReview = await reviewService.submitReview(
      rideId,
      rating,
      comment
    );

    return response.status(201).json(savedReview);
  } catch (error) {
    return next(error);
  }
}

async function putReview(request, response, next) {
  try {
    const { rideId, rating, comment } = request.body;

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

    const updatedReview = await reviewService.modifyReview(
      rideId,
      rating,
      comment
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
