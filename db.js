var mongoose = require('mongoose');

var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/todomvc';

mongoose.connect(mongoUri);

var userSchema = mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: String,
  provider: String,
  github: mongoose.Schema.Types.Mixed
});

var User = mongoose.model('User', userSchema);

exports.User = User;