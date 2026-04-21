const promosRepository = require('./promos-repository');

async function getActivePromos() {
  return promosRepository.getActivePromos();
}

async function getPromoByCode(code) {
  const formattedCode = code.toUpperCase();
  return promosRepository.getPromoByCode(formattedCode);
}

async function createPromo(code, discountPercentage, maxDiscount, expiryDate) {
  const formattedCode = code.toUpperCase();
  
  return promosRepository.createPromo(
    formattedCode, 
    discountPercentage, 
    maxDiscount, 
    expiryDate
  );
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