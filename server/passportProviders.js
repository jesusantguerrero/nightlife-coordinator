const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const db = require('./models/db');
const User = require('./models/User'); 

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: "https://ic-voting.herokuapp.com/auth/twitter/callback/"
  },

  (token, tokenSecret, profile, done) => {
    User.findOrCreate(profile).then((user) => {
      return done(null, profile);
    }).catch((err) => {
      return done(null, profile)
    })
    return done(null, profile)
  }
))

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


module.exports = passport;
