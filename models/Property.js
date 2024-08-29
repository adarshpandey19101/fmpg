const mongoose = require('mongoose');
const { type } = require('os');

// Define the schemaconst
 propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: [String], // Array of stringsrequired: true
  },
  type: {
    type: String,
    required: true
  },
  images: {
    type: [String], // Array of strings, assuming URLs or file pathsrequired: true
  },
  map: {
    type: String// Assuming this is a URL or a string representing map info
  },
  amenities: {
    type: [String], // Array of strings, e.g., 'WiFi', 'Parking'required: true
  },
  description: {
    type: String,
    required: true
  },
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'room' }]
});

// Create the model
const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
