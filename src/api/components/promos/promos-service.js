const promosRepository = require('./promos-repository');
const notificationsService = require('../notifications/notifications-service');

async function getActivePromos() {
  return promosRepository.getActivePromos();
}

async function getPromoByCode(code) {
  const formattedCode = code.toUpperCase();
  return promosRepository.getPromoByCode(formattedCode);
}

async function createPromo(fare, code, discountPercentage, maxDiscount, expiryDate) {
  const formattedCode = code.toUpperCase();
  
  const newPromo = await promosRepository.createPromo(
    fare,
    formattedCode, 
    discountPercentage, 
    maxDiscount, 
    expiryDate
  );

  if (newPromo) {
    await notificationsService.createNotification(
      "BROADCAST_ALL", 
      'New Promo Available!',
      `Use code ${formattedCode} to get ${discountPercentage}% discount. Don't miss out!`,
      'promo'
    );
  }
  
  return newPromo;
}

async function deletePromo(id) {
  return promosRepository.deletePromo(id);
}

module.exports = {
  getActivePromos,
  getPromoByCode,
  createPromo,
  deletePromo,
};