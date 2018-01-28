const mongoose = require('mongoose');

class Places {

  constructor() {
    this.model = mongoose.model('places', new mongoose.Schema({
      id: String,
      searchId: mongoose.Schema.Types.ObjectId,
      users: Array,
      created: { type: Date, default: Date.now() }
    }));
  }

  createOrAdd(place, userId) {
    return this.model.findOne({ id: place.id }).then((foundPlace) => {
      if (foundPlace) {
        return (foundPlace.users.includes(userId)) ? this.removeUser(place.id, userId) : this.addUser(place.id, userId);
      }
      return this.createPlace(place.id, place.searchId, userId);
    })
  }

  createPlace(id, searchId, userId) {
    return this.model.create({ id: id, searchId: searchId, users: [userId] })
  }

  deletePlace(id) {
    return this.model.remove({ id: id })
  }

  addUser(id, userId) {
    console.log('adding this vaina')
    return this.model.findOne({ id: id }).then((place) => {
      place.users.push(userId);
      return this.model.findOneAndUpdate({ id: id }, { users: place.users })
    })
  }

  removeUser(id, userId) {
    return this.model.findOne( { id: id }).then(( place) => {
      const userList = place.users;
      const index = userList.indexOf(userId);
      userList.splice(index, 1);
      if (userList.length > 0) {
        return this.model.findOneAndUpdate({ id: id } , { users: userList })
      } else {
        return this.deletePlace(id);
      }
    })
  }
}

module.exports  = new Places();

