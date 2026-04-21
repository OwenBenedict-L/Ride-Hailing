const jwt = require('jsonwebtoken');
const authRepository = require('./auth-repository');
<<<<<<< HEAD

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
=======
const { passwordMatched } = require('../../../utils/password');

async function generateTokenDriver(email){
    const secretKey = 'RANDOM_STRING';
    const payLoad = {
        email,
        timestamp: Date.now(),
    }

    return jwt.sign(payLoad, secretKey, { expiresIn: '1d', });
}

async function checkLoginDriver(email, password) {
    const driver = await authRepository.getDriverByEmail(email);

    const driverPass = driver ? driver.password : '<RANDOM>';
    const loginPassed = await passwordMatched(password, driverPass);

    if (driver && loginPassed){
        return {
            email: driver.email,
            token: generateToken(email)
        }
    }

    return null;
}

module.exports = {
    generateTokenDriver,
    checkLoginDriver 
};
>>>>>>> d19c15ede408254d66d580f64098b18e586646e9
