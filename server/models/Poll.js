const mongoose = require('mongoose');

const Poll = mongoose.model('Poll', new mongoose.Schema({
  id: String,
  userId: String,
  title: String,
  options: [mongoose.Schema.Types.Mixed],
  votes: mongoose.Schema.Types.Mixed,
  userName: String,
  created: { type: Date, default: Date.now() },
  photo: String
}));

module.exports  = Poll;

