const express = require('express');

const reviewsController = require('./reviews-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/reviews', route);

  // Get review
  route.get('/:ride_id', reviewsController.getReview);

  // Create review
  route.post('/', reviewsController.postReview);

  // Update review
  route.put('/', reviewsController.putReview);
};
