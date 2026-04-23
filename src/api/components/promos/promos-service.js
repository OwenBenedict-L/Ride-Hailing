const promosRepository = require('./promos-repository');

async function getActivePromos() {
  return promosRepository.getActivePromos();
}

async function getPromoByCode(code) {
  const formattedCode = code.toUpperCase();
  return promosRepository.getPromoByCode(formattedCode);
}

async function createPromo(fare, code, discountPercentage, maxDiscount, expiryDate) {
  const formattedCode = code.toUpperCase();
  
  return promosRepository.createPromo(
    fare,
    formattedCode, 
    discountPercentage, 
    maxDiscount, 
    expiryDate
  );
}

async function deletePromo(id) {
  return promosRepository.deletePromo(id);
}

async function calculateDiscount(code, baseFare) {
  const promo = await getPromoByCode(code);
  
  if (!promo || promo.expiry_date < new Date() || !promo.is_active) {
    throw new Error('Promo is invalid or expired'); 
  }

  let discountAmount = (promo.discount_percentage / 100) * baseFare;
  if (promo.max_discount && discountAmount > promo.max_discount) {
    discountAmount = promo.max_discount;
  }

  return {
    originalFare: baseFare,
    discountAmount: discountAmount,
    finalFare: baseFare - discountAmount,
    promoCode: promo.code
  };
}

module.exports = {
  getActivePromos,
  getPromoByCode,
  createPromo,
  deletePromo,
  calculateDiscount,
};