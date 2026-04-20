module.exports = (db) =>
  db.model(
    'Estimations',
    db.Schema({
      userId: { type: String, required: true },
      origin: { type: String, required: true },
      destination: { type: String, required: true },
      distance: Number,
      price: Number,
      estimatedTime: { type: Number },
      surgeMultiplier: { type: Number, default: 1.0 },
      status: { 
        type: String, 
        enum: ['ACTIVE', 'COMPLETED', 'CANCELLED'], 
        default: 'ACTIVE' 
      },
    }, { timestamps: true })
  );