var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: String,
  provider: String,
  github: mongoose.Schema.Types.Mixed
});

var User = mongoose.model('User', userSchema);

module.exports = User;