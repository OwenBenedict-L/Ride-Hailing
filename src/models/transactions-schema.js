module.exports = (db) =>
  db.model(
    'Transactions',
    db.Schema({
      userId: {
        type: String,
        required: true,
      },
      transactionType: {
        type: String,
        enum: ['top-up', 'ride_payment'],
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    })
  );
