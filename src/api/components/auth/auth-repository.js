const { Users, Drivers } = require('../../../models');

async function getByEmail(email) {
  let account = await Users.findOne({ email });
  let role = 'user';

  if (!account) {
    account = await Drivers.findOne({ email });
    role = 'driver';
  }

  if (!account) return null;

  return {
    account,
    role,
  };
}

module.exports = { getByEmail };
