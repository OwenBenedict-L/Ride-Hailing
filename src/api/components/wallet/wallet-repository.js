const { Wallets, Transactions } = require('../../../models');

async function createWallet(userId) {
  return Wallets.create({
    userId: userId.toString(),
    balance: 0,
  });
}

async function getBalance(userId) {
  // Cari berdasarkan userId string
  return Wallets.findOne({ userId: userId.toString() });
}

async function saveTransaction(transactionData) {
  return Transactions.create(transactionData);
}

async function updateBalance(userId, newBalance) {
  return Wallets.findOneAndUpdate(
    { userId: userId.toString() },
    { $set: { balance: newBalance } },
    { new: true }
  );
}

module.exports = {
  createWallet,
  getBalance,
  saveTransaction,
  updateBalance,
};
