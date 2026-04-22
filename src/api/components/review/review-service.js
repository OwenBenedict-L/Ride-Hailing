const reviewRepository = require('./review-repository');
const notificationsService = require('../notifications/notifications-service');

async function getReview(rideId) {
  const review = await reviewRepository.getReview(rideId);

  if (!review) {
    throw new Error('Review has not been submitted for this ride');
  }

  return review;
}

async function submitReview(rideId, rating, comment, userId) {
  const newReview = {
    rideId,
    rating,
    comment,
  };

  const createdReview = await reviewRepository.createNewReview(newReview);

  if (createdReview) {
    await notificationsService.createNotification(
      userId,
      'Review Received!',
      `Thank you for your rating. Your feedback helps us improve!`,
      'system'
    );
  }

  return createdReview;
}

async function modifyReview(rideId, newRating, newComment, userId) {
  await getReview(rideId);

  const updateData = {
    rating: newRating,
    comment: newComment,
    updatedDate: new Date(),
  };

  const updatedReview = await reviewRepository.updateReviewData(rideId, updateData);

  if (updatedReview) {
    await notificationsService.createNotification(
      userId,
      'Review Updated',
      'Your review has been successfully updated.',
      'system'
    );
  }

  return updatedReview;
}

module.exports = {
  getReview,
  submitReview,
  modifyReview,
};
