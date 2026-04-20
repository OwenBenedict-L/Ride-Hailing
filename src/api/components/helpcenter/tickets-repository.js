// Pastikan path ini mengarah ke file index.js di folder models kamu
const db = require('../../../models');
const Ticket = db.Tickets; 

async function create(data) {
  return await Ticket.create(data);
}

async function findByUserId(userId) {
  return await Ticket.find({ userId }).sort({ createdAt: -1 });
}

async function findById(id) {
  return await Ticket.findById(id);
}

async function updateById(id, updateData) {
  return await Ticket.findByIdAndUpdate(id, updateData, { new: true });
}

async function saveTicket(ticketInstance) {
  return await ticketInstance.save();
}

module.exports = {
  create,
  findByUserId,
  findById,
  updateById,
  saveTicket,
};
