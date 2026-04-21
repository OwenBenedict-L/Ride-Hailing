module.exports = (db) =>
  db.model(
    'Notifications',
    db.Schema(
      {
        userId: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        message: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: ['booking_info', 'payment', 'promo', 'system'],
          default: 'system',
        },
        isRead: {
          type: Boolean,
          default: false,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
      {
        timestamps: true,
      }
    )
  );
