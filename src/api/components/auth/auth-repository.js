<<<<<<< HEAD
const { Users } = require('../../../models');

async function getUserbyEmail(email) {
  return Users.findOne({ email });
}

module.exports = { getUserbyEmail };
=======
const { Drivers } = require('../../../models');

async function getDriverByEmail(email) {
    return Drivers.findOne({ email });
}

module.exports = { getDriverByEmail };
>>>>>>> d19c15ede408254d66d580f64098b18e586646e9
