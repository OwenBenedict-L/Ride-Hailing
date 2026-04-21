const jwt = require('jsonwebtoken');
const authRepository = require('./auth-repository');
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