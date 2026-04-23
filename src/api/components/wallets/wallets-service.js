const walletsRepository = require('./wallets-repository');
const notificationsService = require('../notifications/notifications-service');

async function createWallet(userId) {
  return walletsRepository.createWallet(userId);
}

async function getBalance(userId) {
  const walletData = await walletsRepository.getBalance(userId);

  if (!walletData) {
    throw new Error('User wallet not found');
  }

  return walletData;
}

async function topUpBalance(userId, amount) {
  const wallet = await walletsRepository.getBalance(userId);

  if (!wallet) {
    throw new Error('User wallet not found');
  }

  const finalBalance = wallet.balance + amount;

  const transactionData = {
    userId,
    transactionType: 'top-up',
    amount,
  };

  await walletsRepository.saveTransaction(transactionData);
  const updatedWallet = await walletsRepository.updateBalance(
    userId,
    finalBalance
  );

  if (updatedWallet) {
    await notificationsService.createNotification(
      userId,
      'Top-up Success!',
      `Rp${amount.toLocaleString()} has been added to your wallet!`,
      'payment'
    );
  }

  return {
    transaction: transactionData,
    remainingBalance: updatedWallet.balance,
  };
}

async function payForRide(userId, amount) {
  const wallet = await walletsRepository.getBalance(userId);

  if (!wallet) {
    throw new Error('User wallet not found');
  }

  if (wallet.balance < amount) {
    throw new Error('Insufficient balance to make payment');
  }

  const finalBalance = wallet.balance - amount;

  const transactionData = {
    userId,
    transactionType: 'ride_payment',
    amount,
  };

  await walletsRepository.saveTransaction(transactionData);
  const updatedWallet = await walletsRepository.updateBalance(
    userId,
    finalBalance
  );

  if (updatedWallet) {
    await notificationsService.createNotification(
      userId,
      'Payment Successful!',
      `Payment of Rp${amount.toLocaleString()} for your ride was successful.`,
      'payment'
    );
  }

  return {
    transaction: transactionData,
    remainingBalance: updatedWallet.balance,
  };
}

async function getHistory(userId) {
  const history = await walletsRepository.getHistory(userId);
  return history;
}

module.exports = {
  createWallet,
  getBalance,
  topUpBalance,
  payForRide,
  getHistory,
};
