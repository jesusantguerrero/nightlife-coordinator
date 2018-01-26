const mongoose = require('mongoose');

const Searches = mongoose.model('Searches', new mongoose.Schema({
  id: { type: mongoose.Types.ObjectId, autoincrement: true },
  location: String,
}));

module.exports  = Searches;

