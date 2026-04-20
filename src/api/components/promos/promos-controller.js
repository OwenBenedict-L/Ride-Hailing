const promosService = require('./promos-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getActivePromos(request, response, next) {
  try {
    const promos = await promosService.getActivePromos();
    return response.status(200).json(promos);
  } catch (error) {
    return next(error);
  }
}

async function createPromo(request, response, next) {
  try {
    const { code, discount_percentage, max_discount, expiry_date } =
      request.body;

    if (!code || !discount_percentage) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Code and discount percentage are required'
      );
    }

    const success = await promosService.createPromo(
      code,
      discount_percentage,
      max_discount,
      expiry_date
    );
    return response
      .status(201)
      .json({ message: 'Promo created successfully', data: success });
  } catch (error) {
    return next(error);
  }
}

async function validatePromo(request, response, next) {
  try {
    const { code, ride_cost } = request.body;

    const promo = await promosService.getPromoByCode(code);

    if (!promo || promo.expiry_date < new Date() || !promo.is_active) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Promo is invalid or expired'
      );
    }

    // Hitung diskon
    let discountAmount = (promo.discount_percentage / 100) * ride_cost;
    if (promo.max_discount && discountAmount > promo.max_discount) {
      discountAmount = promo.max_discount;
    }

    const finalCost = ride_cost - discountAmount;

    return response.status(200).json({
      original_cost: ride_cost,
      discount_amount: discountAmount,
      final_cost: finalCost,
    });
  } catch (error) {
    return next(error);
  }
}

async function deletePromo(request, response, next) {
  try {
    const success = await promosService.deletePromo(request.params.id);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete promo'
      );
    }
    return response.status(200).json({ message: 'Promo deleted successfully' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getActivePromos,
  createPromo,
  validatePromo,
  deletePromo,
};
