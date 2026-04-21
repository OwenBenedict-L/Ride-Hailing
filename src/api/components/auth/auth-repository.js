const { Drivers } = require('../../../models');

async function getDriverByEmail(email) {
    return Drivers.findOne({ email });
}

module.exports = { getDriverByEmail };