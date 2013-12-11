// general module import
var express = require('express')
  , http = require('http')
//  , cookie = require('cookie')
//  , connect = require('connect')

// create server
var app = express();
var server = http.createServer(app).listen(5555);


// express global settings
app.use(express.static(__dirname + '/public/'));
app.set('view engine', 'jade');
app.set('views', __dirname + '/view');


// route
/*
app.get('/', site.index);
app.get('/client', site.client);
*/