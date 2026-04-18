module.exports = (db) =>
  db.model(
    'Reviews',
    db.Schema({
      rideId: {
        type: String,
        required: true,
        unique: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      comment: {
        type: String,
        default: '',
      },
      reviewDate: {
        type: Date,
        default: Date.now,
      },
      updatedDate: {
        type: Date,
      },
    })
  );
