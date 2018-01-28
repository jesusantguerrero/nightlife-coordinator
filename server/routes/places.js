const express = require('express');
const router = express.Router();
const yelp = require('yelp-fusion');
const Places = require('./../models/Places');
const Searches = require('./../models/Searches');
/* GET home page. */

router.get('/search', function(req, res, next) {
  const client = yelp.client(process.env.YELP_API_KEY);
  const location = req.query.location || 'La Romana';
  Searches.findOrCreate(location).then((search) => {
    
    client.search({ location: location })
    .then((result) => {
      res.json(result.jsonBody)
    })
    .catch((err) => {
      console.log(err);
      res.end('error')
    })

  });

});

router.get('/', (req, res) => {
  Searches.model.find().then((result) => {
    res.json(result);
  })
})

router.post('/add/:placeId', (req, res) => {

} )

module.exports = router;
