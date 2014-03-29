var mongoose = require('mongoose');
var User = require('./models/User');

var connString = process.env.MONGOLAB_URI ||
                 process.env.MONGOHQ_URL ||
                 'mongodb://localhost/todomvc';

mongoose.connect(connString);

// Should you need to do something on open or close...
mongoose.connection.on('open', function () {
  console.log('Mongo connected.');
});

mongoose.connection.on('close', function () {
  console.log('Mongo closed.');
});

module.exports.User = User;