module.exports = (db) =>
  db.model(
    'Chats',
    db.Schema({
      rideId: {
        type: String,
        required: true,
      },
      sender: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      created_at: {
        type: Date, 
        default: Date.now 
      },
      updated_at: Date,
    })
  );
