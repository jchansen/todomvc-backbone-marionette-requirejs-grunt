/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var users = require('./controllers/users');
var signUp = require('./routes/signUp');
var http = require('http');
var path = require('path');
var engine = require('ejs-locals');
//var flash = require('connect-flash');

var app = express();

//app.set('env', process.env.NODE_ENV || 'development');

// all environments
app.engine('ejs', engine); // provides use of layout in ejs templates
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
//app.use(flash());

app.use(function(req, res, next){
  //res.locals.userIsAuthenticated = req.isAuthenticated(); // check for user authentication
  //res.locals.user = req.user; // make user available in all views
  //res.locals.errorMessages = req.flash('error'); // make error alert messages available in all views
  //res.locals.successMessages = req.flash('success'); // make success messages available in all views
  app.locals.layoutPath = "../shared/layout";
  next();
});

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

// routes
app.get('/', routes.index);

app.get('/register', users.register);
app.post('/register', users.userValidations, users.create);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
