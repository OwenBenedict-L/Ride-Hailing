module.exports = (db) =>
  db.model(
    'Drivers',
    db.Schema(
      {
        email: {
          type: String,
          required: true,
        },
        password: {
          type: String,
          required: true,
        },
        fullNameDrivers: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ['Available', 'Busy', 'Offline'],
          default: 'Available',
        },
        activeBookingId: {
          type: db.Schema.Types.ObjectId,
          ref: 'Bookings',
          default: null
        },
        deleted: {
          type: Boolean,
          default: false,
        },
      },
      {
        timestamp: true,
      }
    )
  );
