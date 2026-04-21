const walletService = require('./wallet-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getBalance(request, response, next) {
  try {
    const userId = request.params.id;
    const balanceData = await walletService.getBalance(userId);

    if (!balanceData) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'User wallet not found'
      );
    }

    return response.status(200).json(balanceData);
  } catch (error) {
    return next(error);
  }
}

async function topUpBalance(request, response, next) {
  try {
    const { userId, amount } = request.body;

    // User ID is required
    if (!userId) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'User ID is required');
    }

    // Amount is required and must be greater than 0
    if (!amount || amount <= 0) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Top-up amount must be greater than 0'
      );
    }

    const topUpResult = await walletService.topUpBalance(userId, amount);

    return response.status(200).json(topUpResult);
  } catch (error) {
    return next(error);
  }
}

async function payForRide(request, response, next) {
  try {
    const { userId, amount } = request.body;

    // User ID is required
    if (!userId) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'User ID is required');
    }

    // Amount is required and must be greater than 0
    if (!amount || amount <= 0) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Payment amount must be greater than 0'
      );
    }

    const paymentResult = await walletService.payForRide(userId, amount);

    return response.status(200).json(paymentResult);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getBalance,
  topUpBalance,
  payForRide,
};
