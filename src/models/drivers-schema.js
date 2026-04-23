module.exports = (db) =>
  db.model(
    'Drivers',
    db.Schema(
      {
        email: String,
        password: String,
        fullNameDrivers: String,

        status: {
          type: String,
          enum: ['AVAILABLE', 'BUSY', 'OFFLINE'], // Gunakan status kerja, bukan status booking
          default: 'AVAILABLE',
        },
        activeBookingId: {
          type: db.Schema.Types.ObjectId, // Tipe data ID yang benar
          ref: 'Bookings', // Referensi ke model Bookings
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
