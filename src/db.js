// Put all our db config here
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/db');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
});

module.exports = db;
