const walletRepository = require('./wallet-repository');

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

  return {
    transaction: transactionData,
    remainingBalance: updatedWallet.balance,
  };
}

module.exports = {
  getBalance,
  topUpBalance,
  payForRide,
};
