const estimationsService = require('./estimations-service');

async function createEstimation(request, response, next) {
  try {

    const userId = request.body.userId || 'guest_user';

    const existingEstimation = await estimationsService.getEstimationByUserId(userId);

    if (existingEstimation) {
      return response.status(400).json({
        statusCode: 400,
        error: 'DUPLICATE_ESTIMATION',
        message: `User ${userId} sudah memiliki estimasi aktif. Silakan selesaikan atau hapus estimasi lama sebelum membuat yang baru.`,
      });
    }

    const result = await estimationsService.createEstimation(userId, request.body);
    return response.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

async function getEstimationById(request, response, next) {
  try {
    const { id } = request.params;
    const result = await estimationsService.getEstimationById(id);
    
    if (!result) {
      return response.status(404).json({ message: 'Estimation not found' });
    }
    
    return response.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function updateEstimationRoute(request, response, next) {
  try {
    const { id } = request.params;
    const result = await estimationsService.updateEstimationRoute(id, request.body);
    
    if (!result) {
      return response.status(404).json({ message: 'Estimation not found' });
    }

    return response.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function getSurgeMultiplier(request, response, next) {
  try {
    const { lat, lng } = request.query;
    const result = await estimationsService.getSurgeMultiplier(lat, lng);
    return response.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function deleteEstimation(request, response, next) {
  try {
    const { id } = request.params;
    const result = await estimationsService.deleteEstimation(id);
    
    if (!result) {
      return response.status(404).json({ message: 'Estimation not found' });
    }

    return response.status(200).json({ message: 'Estimation deleted successfully' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createEstimation,
  getEstimationById,
  updateEstimationRoute,
  getSurgeMultiplier,
  deleteEstimation,
};
