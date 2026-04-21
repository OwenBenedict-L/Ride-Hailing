const estimationsRepository = require('./estimations-repository');

async function createEstimation(userId, data) {
  const distance = data.distance || 1; //dalam kilometer
  const price = distance * 5000; 
  const estimatedTime = Math.ceil(distance * 4); //dalam menit

  return estimationsRepository.createEstimation(userId, {
    ...data,
    price,
    estimatedTime,
    surgeMultiplier: 1.0
  });
}

async function getEstimationById(id) {
  return estimationsRepository.getEstimationById(id);
}

async function updateEstimationRoute(id, data) {
  const updatedPrice = 25000; 
  return estimationsRepository.updateRoute(id, {
    ...data,
    price: updatedPrice
  });
}

async function getSurgeMultiplier(lat, lng) {
  return { lat, lng, multiplier: 1.0, status: 'Normal' };
}

async function deleteEstimation(id) {
  return estimationsRepository.deleteEstimation(id);
}

async function getEstimationByUserId(userId) {
  return estimationsRepository.getEstimationByUserId(userId);
}

module.exports = {
  getEstimationByUserId,
  createEstimation,
  getEstimationById,
  updateEstimationRoute,
  getSurgeMultiplier,
  deleteEstimation,
};
