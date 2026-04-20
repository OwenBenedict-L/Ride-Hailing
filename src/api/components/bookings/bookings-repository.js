const { Bookings } = require('../../../models');

async function getHistory(userId) {
  return Bookings.find({ userId }).sort({ createdAt: -1 });
}

async function getActives(userId) {
  return Bookings.find({
    userId,
    status: { $in: ['pending', 'confirmed', 'on_way'] },
  }).sort({ createdAt: -1 });
}

async function getBooking(id) {
  return Bookings.findById(id);
}

async function createBooking(payload) {
  return Bookings.create(payload);
}

async function updateBooking(id, payload) {
  return Bookings.updateOne({ _id: id }, { $set: payload });
}

async function deleteBooking(id) {
  return Bookings.deleteOne({ _id: id });
}

module.exports = {
  getHistory,
  getActives,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
};
