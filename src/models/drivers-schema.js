module.exports = (db) =>
  db.model(
    'Drivers',
  db.Schema({
    email : String,
    password : String,
    fullNameDrivers : String,
    status : {
      type : String,
      default : "OFFLINE",
    },

    // location : {
    //   type : Number,
    //   la : { type : Number, default : 0 },
    //   lo : { type : Number, default : 0 }
    // }

    deleted : {
      type: Boolean,
      default : false,
    }
  }, {
    timestamp : true
  })
  )
