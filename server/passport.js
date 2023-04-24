const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("./controllers/config");
require("dotenv").config();

const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Global Variables
const FACEBOOK_APP_ID = "3726567494237129";
const FACEBOOK_SECRET = "1fa0b21f47cd25956c02ed96139f2019";
const GOOGLE_CLIENT_ID =
  "803779558454-i5f0skhoc2d7v67abpusvt8crvmsqu6h.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

// configure Facebook authentication strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_SECRET,
      callbackURL: "/auth/facebook/ecofitcloud",
      profileFields: ["id", "displayName", "email"],
    },
    function (accessToken, refreshToken, profile, cb) {
      // find or create client based on Facebook profile data
      const client = require("./models/client");
      client.findOrCreate({ facebookId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

// Configure Google authentication strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, cb) {
      // console.log(profile);
      const client = require("./models/client");
      // console.log(profile._json);
      client.findOrCreate(
        {
          googleId: profile.id,
          email: profile._json.email,
          firstname: profile._json.given_name,
          lastname: profile._json.family_name,
        },
        function (err, user) {
          console.log(user);
          //   return cb(err, user);
          if (err) {
            // Check for a duplicate key error
            if (err.code === 11000) {
              // If the error is a duplicate key error, find the existing user and return it
              client.findOne(
                { email: profile._json.email },
                function (err, user) {
                  return cb(null, user);
                }
              );
            } else {
              // If the error is not a duplicate key error, return the error
              return cb(err);
            }
          } else {
            console.log(user);
            // If there is no error, return the user object
            return cb(null, user);
          }
        }
      );
      // done(null, profile)
    }
  )
);

passport.serializeUser((client, done) => {
  done(null, client);
});

passport.deserializeUser((client, done) => {
  done(null, client);
});
const createRefreshToken = (client) => {
  return jwt.sign(client, config.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
};
