module.exports = (db) =>
  db.model(
    'Chats',
    db.Schema({
      rideId: String,
      sender: String,
      message: String,
      created_at: { type: Date, default: Date.now },
      updated_at: Date,
    })
  );
