const walletsService = require('./wallets-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getBalance(request, response, next) {
  try {
    const userId = request.params.id;
    const balanceData = await walletsService.getBalance(userId);

    return response.status(200).json(balanceData);
  } catch (error) {
    if (error.message === 'User wallet not found') {
      return next(
        errorResponder(errorTypes.UNPROCESSABLE_ENTITY, error.message)
      );
    }
    return next(error);
  }
}

async function topUpBalance(request, response, next) {
  try {
    const { userId, amount } = request.body;

    if (!userId) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'User ID is required');
    }

    if (!amount || amount <= 0) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Amount must be > 0');
    }

    const topUpResult = await walletsService.topUpBalance(userId, amount);
    return response.status(200).json(topUpResult);
  } catch (error) {
    return next(error);
  }
}

async function getHistory(request, response, next) {
  try {
    const userId = request.params.userId;

    if (!userId) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'User ID is required');
    }

    const history = await walletsService.getHistory(userId);

    return response.status(200).json(history);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getBalance,
  topUpBalance,
  getHistory,
};
