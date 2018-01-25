const express = require('express');
const router = express.Router();
const passport =  require('./../passportProviders');

//  authentication related
router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/auth/twitter/callback', passport.authenticate('twitter',
  { 
    successRedirect: '/',
    failureRedirect: '/'
  }
))

router.get('/auth/current', (req, res) => {
  res.json({ user: req.user });
})

module.exports = router;
