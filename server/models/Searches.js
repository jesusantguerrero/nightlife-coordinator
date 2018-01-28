const mongoose = require('mongoose');

class Searches {
  constructor() {
    this.model = mongoose.model('Searches', new mongoose.Schema({
      location: String,
    }));
  }

  create(location) {
    return this.model.create({ location: location }).then((search) => {
      return search;
    })
  }

  findOrCreate(location) {
    return this.model.findOne({ location : location }).then((search) => {
      if (search) {
        console.log('here')
        return search;
      }
      console.log('there')
      return this.create(location);
    })
  }
}

module.exports  = new Searches();

