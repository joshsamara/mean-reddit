#!/usr/bin/env node
// Setup the app
var express = require('express');
var app = express();

// Load Passport & Login Modules
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(session({ secret: 'this is a secret',
                  resave: true,
                  saveUninitialized: true}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// Logging module
var morgan = require('morgan');
app.use(morgan('combined'));

// We're going to need this to parse JSOn
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Load our db config
var mongoose = require('mongoose');
db_url = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/readit';
mongoose.connect(db_url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("mongodb connection open");
});


// Keep our models here so we can pass them around
var models = {};
models.User = require('./src/models/user');
models.Group = require('./src/models/group');
models.Post = require('./src/models/post');
models.Comment = require('./src/models/comment');
models.PVote = require('./src/models/pvote');
models.CVote = require('./src/models/cvote');

// Setup our login strategy
passport.use(new LocalStrategy(models.User.authenticate()));
passport.serializeUser(models.User.serializeUser());
passport.deserializeUser(models.User.deserializeUser());

// Load our model-specific routes
require('./src/routes/user')(app, models, passport);
require('./src/routes/group')(app, models);
require('./src/routes/post')(app, models);
require('./src/routes/comment')(app, models);
require('./src/routes/pvote')(app, models);
require('./src/routes/cvote')(app, models);

// Our static files
app.use(express.static(__dirname + '/public/html'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/css', express.static(__dirname + '/public/css'));

// Open shift setup
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

console.log("Serving on port " + port);
app.listen(port, ip);
