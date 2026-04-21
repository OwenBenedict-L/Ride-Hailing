const reviewRepository = require('./review-repository');

async function getReview(rideId) {
  const review = await reviewRepository.getReview(rideId);

  if (!review) {
    throw new Error('Review has not been submitted for this ride');
  }

  return review;
}

async function submitReview(rideId, rating, comment) {
  const newReview = {
    rideId,
    rating,
    comment,
  };

  return reviewRepository.createNewReview(newReview);
}

async function modifyReview(rideId, newRating, newComment) {
  await getReview(rideId);

  const updateData = {
    rating: newRating,
    comment: newComment,
    updatedDate: new Date(),
  };

  return reviewRepository.updateReviewData(rideId, updateData);
}

module.exports = {
  getReview,
  submitReview,
  modifyReview,
};
