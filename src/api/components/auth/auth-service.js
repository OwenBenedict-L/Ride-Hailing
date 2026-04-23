const jwt = require('jsonwebtoken');
const authRepository = require('./auth-repository');
const usersRepository = require('../users/users-repository');
const walletService = require('../wallet/wallet-service');
const { passwordMatched, hashPassword } = require('../../../utils/password');
const notificationsService = require('../notifications/notifications-service');

async function register(email, password, fullName) {
  const existingUser = await usersRepository.getUserByEmail(email);
  if (existingUser) {
    throw new Error('Email already exists');
  }
  const hashedPassword = await hashPassword(password);

  const newUser = await usersRepository.createUser(
    email,
    hashedPassword,
    fullName
  );

  if (newUser) {
    await walletService.createWallet(newUser._id.toString());
    await notificationsService.createNotification(
      newUser._id.toString(),
      'Welcome!',
      `Hi ${fullName}! Your account and wallet are ready!`,
      'system'
    );
  }

  return newUser;
}

function generateToken(id, email, role) {
  const secretKey = 'RANDOM_STRING';
  const payload = {
    id: id.toString(),
    email,
    role,
    timestamp: Date.now(),
  };
  return jwt.sign(payload, secretKey, {
    expiresIn: '1d',
  });
}

async function checkLogin(email, password) {
  const result = await authRepository.getByEmail(email);

  if (!result) return null;

  const hashedPassword = result.account.password;
  const loginPassed = await passwordMatched(password, hashedPassword);

  if (loginPassed) {
    const userAccount = result.account;
    const userRole = result.role;

    // Ambil ID dan pastikan jadi string agar tidak jadi [object Object] di token
    const userId = (userAccount._id || userAccount.id).toString();

    return {
      email: userAccount.email,
      role: userRole,
      token: generateToken(userId, userAccount.email, userRole),
    };
  }

  return null;
}

module.exports = { checkLogin, register };
