const { Reviews } = require('../../../models');

async function getReview(rideId) {
  return Reviews.findOne({ rideId });
}

async function createNewReview(reviewData) {
  return Reviews.create(reviewData);
}

async function updateReviewData(rideId, updateData) {
  return Reviews.findOneAndUpdate(
    { rideId },
    { $set: updateData },
    { new: true }
  );
}

module.exports = {
  getReview,
  createNewReview,
  updateReviewData,
};
