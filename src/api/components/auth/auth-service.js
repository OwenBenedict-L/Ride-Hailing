const jwt = require('jsonwebtoken');
const authRepository = require('./auth-repository');
const usersRepository = require('../users/users-repository');
const walletService = require('../wallet/wallet-service');
const { passwordMatched, hashPassword } = require('../../../utils/password');

async function registerUser(email, password, fullName) {
  const existingUser = await usersRepository.getByEmail(email);
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
  }

  return newUser;
}

function generateToken(id, email, role) {
  const secretKey = 'RANDOM_STRING';
  const payload = {
    id,
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
  const pass = pass ? pass.password : '<RANDOM>';
  const loginPassed = await passwordMatched(password, pass);

  const { account, role } = result;

  if (loginPassed) {
    return {
      email: account.email,
      role,
      token: generateToken({
        id: account.id,
        email: account.email,
        role,
      }),
    };
  }
  return null;
}

module.exports = {
  checkLogin,
  registerUser,
};
