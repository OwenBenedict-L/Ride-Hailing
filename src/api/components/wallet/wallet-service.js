const walletRepository = require('./wallet-repository');
const notificationsService = require('../notifications/notifications-service');

async function createWallet(userId) {
  return walletRepository.createWallet(userId);
}

async function getBalance(userId) {
  const walletData = await walletRepository.getBalance(userId);

  if (!walletData) {
    throw new Error('User wallet not found');
  }

  return walletData;
}

async function topUpBalance(userId, amount) {
  const wallet = await walletRepository.getBalance(userId);

  if (!wallet) {
    throw new Error('User wallet not found');
  }

  const finalBalance = wallet.balance + amount;

  const transactionData = {
    userId,
    transactionType: 'top-up',
    amount,
  };

  await walletRepository.saveTransaction(transactionData);
  const updatedWallet = await walletRepository.updateBalance(
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
  const wallet = await walletRepository.getBalance(userId);

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

  await walletRepository.saveTransaction(transactionData);
  const updatedWallet = await walletRepository.updateBalance(
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

module.exports = {
  createWallet,
  getBalance,
  topUpBalance,
  payForRide,
};
