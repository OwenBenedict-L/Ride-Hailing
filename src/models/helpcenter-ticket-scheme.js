module.exports = (db) =>
  db.model(
    'Tickets',
    db.Schema(
      {
        transactionId: { 
          type: String,
          required: true,
        },
        userId: {
          type: String,
          required: true,
        },
        subject: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ['open', 'resolved'],
          default: 'open',
        },
        replies: [
          {
            sender: {
              type: String,
              enum: ['user', 'cs'],
              required: true,
            },
            message: {
              type: String,
              required: true,
            },
            createdAt: {
              type: Date,
              default: Date.now,
            },
          },
        ],
      },
      {
        timestamps: true,
      }
    )
  );