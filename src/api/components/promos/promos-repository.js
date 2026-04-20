const { Promos } = require('../../../models');

async function getActivePromos() {
  return Promos.find({
    is_active: true,
    expiry_date: { $gte: new Date() },
  });
}

async function getPromoByCode(code) {
  return Promos.findOne({ code });
}

async function createPromo(code, discountPercentage, maxDiscount, expiryDate) {
  return Promos.create({
    code,
    discount_percentage: discountPercentage,
    max_discount: maxDiscount,
    expiry_date: expiryDate,
    is_active: true,
  });
}

async function deletePromo(id) {
  return Promos.deleteOne({ _id: id });
}

module.exports = {
  getActivePromos,
  getPromoByCode,
  createPromo,
  deletePromo,
};
