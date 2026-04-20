module.exports = (db) =>
  db.model(
    'Promos',
    db.Schema({
      code: { 
        type: String, 
        unique: true, 
        required: true 
    },
      discount_percentage: { 
        type: Number, 
        required: true 
    },
      max_discount: { 
        type: Number, 
        default: null 
    },
      expiry_date: { 
        type: Date, 
        required: true 
    },
      is_active: { 
        type: Boolean, 
        default: true 
    },
    })
  );