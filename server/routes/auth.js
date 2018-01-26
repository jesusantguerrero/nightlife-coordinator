const express = require('express');
const router = express.Router();
const passport =  require('./../passportProviders');

//  authentication related
router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback', passport.authenticate('twitter',
  { 
    successRedirect: '/',
    failureRedirect: '/'
  }
))

router.get('/current', (req, res) => {
  res.json({ user: req.user });
})

module.exports = router;
