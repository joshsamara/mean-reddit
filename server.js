// Setup the app
var express = require('express');
var app = express();
var models = {};

// We're going to need thise
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Load our db config
db = require('./src/db');
models.Post = require('./src/models/post');

// Load our routes
require('./src/routes/post')(app, models);

// Our static files
app.use(express.static(__dirname + '/public'));

// Open shift setup
ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ip);
