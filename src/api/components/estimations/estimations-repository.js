const { Estimations } = require('../../../models');

async function createEstimation(userId, data) {
  return Estimations.create({
    userId,
    origin: data.origin,
    destination: data.destination,
    distance: data.distance,
    price: data.price,
    estimatedTime: data.estimatedTime,
    surgeMultiplier: data.surgeMultiplier,
    status: 'ACTIVE',
  });
}

async function getEstimationById(id) {
  return Estimations.findById(id);
}

async function updateRoute(id, data) {
  return Estimations.findByIdAndUpdate(id, data, { new: true });
}

async function deleteEstimation(id) {
  return Estimations.findByIdAndDelete(id);
}

async function getEstimationByUserId(userId) {
  return Estimations.findOne({ userId });
}

module.exports = {
  createEstimation,
  getEstimationById,
  updateRoute,
  deleteEstimation,
  getEstimationByUserId,
};
