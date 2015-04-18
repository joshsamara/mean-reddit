// Put all our db config here
var mongoose = require('mongoose');
db_url = process.env.OPENSHIFT_MONGO_DB_URL || 'mongodb://localhost/';
db_url = db_url + 'readitdb';
mongoose.connect(db_url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
});

module.exports = db;
