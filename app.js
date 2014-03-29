/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var passport = require('passport');
var User = require('./db').User;
var controllers = require('./controllers');
var config = require('./config');

// register GitHub callback for passport
config.setupPassport();

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

// Initialize Passport!
// Also use passport.session() middleware, to support persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.use(app.router);

if (process.env.NODE_ENV == 'production') {
  app.use(express.static(path.join(__dirname, 'public_compiled')));
}else{
  app.use(express.static(path.join(__dirname, 'public')));
}

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Give app to controllers so they can register their own routes and callbacks
controllers.setup(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// TODO: Checkout this article & book & screencast on modular node applications
// http://stackoverflow.com/questions/4602212/organize-routes-in-node-js