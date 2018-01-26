const express = require('express');
const router = express.Router();
const yelp = require('yelp-fusion');
/* GET home page. */
router.get('/search', function(req, res, next) {
  const client = yelp.client(process.env.YELP_API_KEY);

  client.search({ location: req.params.location || 'La Romana' })
  .then((result) => {
    res.json(result.jsonBody)
  })
  .catch((err) => {
    console.log(err);
    res.end('error')
  })
});

module.exports = router;
