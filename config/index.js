var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var User = require('../db').User;

module.exports.setupPassport = function(){
  // Use the GitHubStrategy within Passport.
  //   Strategies in Passport require a `verify` function, which accept
  //   credentials (in this case, an accessToken, refreshToken, and GitHub
  //   profile), and invoke a callback with a user object.
  var GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
  var GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

  passport.use(new GitHubStrategy({
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      // To keep the example simple, the user's GitHub profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the GitHub account with a user record in your database,
      // and return that user instead.

      // Implementation borrowed from:
      // http://stackoverflow.com/questions/20431049/what-is-function-user-findorcreate-doing-and-when-is-it-called-in-passport
      User.findOne({
        'github.id': profile.id
      }, function(err, user) {
        if (err) {
          return done(err);
        }
        //No user was found, so create a new user with values from Github (all the profile. stuff)
        if (!user) {
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            username: profile.username,
            provider: 'github',
            //now in the future searching on User.findOne({'github.id': profile.id } will match because of this next line
            github: profile._json
          });
          user.save(function(err) {
            if (err) console.log(err);
            return done(err, user);
          });
        } else {
          //found user. Return
          return done(err, user);
        }
      });
    }
  ));
}