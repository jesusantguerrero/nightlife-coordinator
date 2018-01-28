const express = require('express');
const router = express.Router();
const yelp = require('yelp-fusion');
const Places = require('./../models/Places');
const Searches = require('./../models/Searches');
/* GET home page. */

router.get('/search', function(req, res, next) {
  const client = yelp.client(process.env.YELP_API_KEY);
  const location = req.query.location || 'La Romana';
  
  Searches.findOrCreate(location.toLowerCase()).then((search) => {

    client.search({ location: location })
    .then((result) => {
      ThePlaces = result.jsonBody.businesses;

      Places.model.find({ searchId: search._id }).then((places) => {
        if (places) {
          ThePlaces.forEach((place, i, originalArray) => {
            places.forEach((placeSaved) => {
              if (place.id == placeSaved.id) {
                originalArray[i].users = placeSaved.users;
              }
            })
          })
        }
        res.json(ThePlaces)
      })
    })

    .catch((err) => {
      res.end()
    })

  });

});

router.get('/', (req, res) => {
  Searches.model.find().then((result) => {
    res.json(result);
  })
})

router.get('/list', (req, res) => {
  Places.model.find().then((result) => {
    res.json(result);
  })
})

router.post('/add/:placeId', (req, res) => {
  const data = JSON.parse(req.body.data);
  Searches.model.findOne({ location: data.location.toLowerCase() }).then((search) => {
    const place = {
      id: req.params.placeId,
      searchId: search._id,
    }

    Places.createOrAdd(place, data.userId).then((result) => {
      res.end();
    });
  })
});

module.exports = router;
