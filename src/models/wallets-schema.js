module.exports = (db) =>
  db.model(
    'Wallets',
    db.Schema({
      userId: {
        type: String,
        required: true,
        unique: true,
      },
      balance: {
        type: Number,
        default: 0,
      },
    })
  );
