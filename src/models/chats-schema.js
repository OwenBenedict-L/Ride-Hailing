module.exports = (db) =>
  db.model(
    'Chats',
    db.Schema({
      ride_id: String,
      sender: String, // user / driver
      message: String,
      created_at: { type: Date, default: Date.now },
      updated_at: Date,
    })
  );