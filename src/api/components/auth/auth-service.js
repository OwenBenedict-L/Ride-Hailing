const jwt = require('jsonwebtoken');
const authRepository = require('./auth-repository');

// PERBAIKAN: Tambahkan dua baris ini agar fungsi register bisa bekerja
const usersRepository = require('../users/users-repository');
const { passwordMatched, hashPassword } = require('../../../utils/password');

async function register(email, password, fullName) {
  const existingUser = await usersRepository.getUserByEmail(email);
  if (existingUser) {
    throw new Error('Email already exists');
  }
  const hashedPassword = await hashPassword(password);
  return usersRepository.createUser(email, hashedPassword, fullName);
}

function generateToken(email) {
  const secretKey = 'RANDOM_STRING';
  const payload = {
    email,
    timestamp: Date.now(),
  };
  return jwt.sign(payload, secretKey, {
    expiresIn: '1d',
  });
}

async function checkLogin(email, password) {
  const user = await authRepository.getUserbyEmail(email);

  const userPass = user ? user.password : '<RANDOM>';
  const loginPassed = await passwordMatched(password, userPass);

  if (user && loginPassed) {
    return {
      email: user.email,
      token: generateToken(email),
    };
  }
  return null;
}

module.exports = {
  checkLogin,
  register,
};
