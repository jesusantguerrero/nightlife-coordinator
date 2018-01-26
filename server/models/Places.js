const mongoose = require('mongoose');

const Places = mongoose.model('places', new mongoose.Schema({
  id: String,
  searchId: mongoose.Types.ObjectId,
  going: mongoose.Schema.Types.Mixed,
  created: { type: Date, default: Date.now() }
}));

module.exports  = Places;

