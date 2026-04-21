const { Drivers } = require('../../../models');

async function getDrivers() {
  return Drivers.find({});
}

async function getDriver(id) {
  return Drivers.findById(id);
}

async function getDriverByEmail(email) {
  return Drivers.findOne({ email });
}

async function updateDriver(id, email, fullNameDrivers) {
  return Drivers.updateOne({ _id: id }, { $set: { email, fullNameDrivers } });
}

// async function updateTracking(id, status, lat, lng) {
//   return Drivers.updateOne(
//     { _id: id },
//     { 
//       $set: { 
//         status, 
//         location: { lat, lng },
//         last_updated: new Date() 
//       } 
//     }
//   );
// }

async function updateStatus(id, status) {
  return Drivers.updateOne(
    { _id: id },
    { $set: { 
        status,
        last_updated: new Date() 
      } }
  );
}

async function deleteDriver(id) {
  return Drivers.deleteOne({ _id: id }, { $set: { deleted: true, status : "ONLINE" } });
}

module.exports = {
  getDrivers,
  getDriver,
  getDriverByEmail,
  updateDriver,
  updateStatus,
  deleteDriver,
};