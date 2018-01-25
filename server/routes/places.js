const express = require('express');
const router = express.Router();
const axios = require('axios');
/* GET home page. */
router.get('/search', function(req, res, next) {
  axios.default.get('https://api.yelp.com/v3/businesses/search?location="la romana"', {
    auth: {
      API_KEY: process.env.YELP_API_KEY
    }
  }).then((result) => {
    res.json(result);
  }).catch((err) => {
    res.json(err);
  })
});

module.exports = router;
