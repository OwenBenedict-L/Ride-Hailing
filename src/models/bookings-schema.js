module.exports = (db) =>
  db.model(
    'Bookings',
    db.Schema(
      {
        userId: {
          type: String,
          required: true,
        },
        driverId: {
          type: String,
          default: null,
        },
        pickupLocation: {
          type: String,
          required: true,
        },
        destinationLocation: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ['pending', 'confirmed', 'on_way', 'completed', 'cancelled'],
          default: 'pending',
        },
        fare: {
          type: Number,
          required: true,
        },
        distance: {
          type: Number, // dalam km
          required: true,
        },
      },
      {
        timestamps: true,
      }
    )
  );
