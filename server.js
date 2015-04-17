// Setup the app
var express = require('express');
var app = express();

// Keep our models here so we can pass them around
var models = {};

// Logging module
var morgan = require('morgan');
app.use(morgan('combined'));

// We're going to need thise
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Load our db config
db = require('./src/db');
models.User = require('./src/models/user');
models.Group = require('./src/models/group');
models.Post = require('./src/models/post');
models.Comment = require('./src/models/comment');

// Load our routes
require('./src/routes/user')(app, models);
require('./src/routes/group')(app, models);
require('./src/routes/post')(app, models);
require('./src/routes/comment')(app, models);

// Our static files
app.use(express.static(__dirname + '/public'));

// Open shift setup
ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ip);
