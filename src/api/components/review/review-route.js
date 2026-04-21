const express = require('express');

const reviewController = require('./review-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/reviews', route);

  // Get review
  route.get('/:ride_id', reviewController.getReview);

  // Create review
  route.post('/', reviewController.postReview);

  // Update review
  route.put('/', reviewController.putReview);
};
