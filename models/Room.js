const mongoose = require('mongoose');


const RoomSchema = new mongoose.Schema({
  // property: { type:String, require:true},
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
  number: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  available: { type: Boolean, default: true }
});
module.exports = mongoose.model('room', RoomSchema);

// const { type } = require('os');

// const RoomSchema = new mongoose.Schema({
//   property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
//   number: { type: String, required: true },
//   type: { type: String, required: true },
//   price: { type: Number, required: true },
//   available: { type: Boolean, default: true }
// });

