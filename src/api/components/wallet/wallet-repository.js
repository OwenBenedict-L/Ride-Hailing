const { Wallets, Transactions } = require('../../../models');

async function getBalance(userId) {
  return Wallets.findOne({ userId });
}

async function saveTransaction(transactionData) {
  return Transactions.create(transactionData);
}

async function updateBalance(userId, newBalance) {
  return Wallets.findOneAndUpdate(
    { userId },
    { $set: { balance: newBalance } },
    { new: true }
  );
}

module.exports = {
  getBalance,
  saveTransaction,
  updateBalance,
};
