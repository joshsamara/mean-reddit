#!/bin/env node
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

app.listen(port, ip);
