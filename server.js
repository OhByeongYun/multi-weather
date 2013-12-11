// general module import
var express = require('express')
  , http = require('http');

// create server
var app = express();
var server = http.createServer(app).listen(5555);


// express global settings
app.use(express.static(__dirname + '/public/'));
app.set('view engine', 'jade');
app.set('views', __dirname + '/view');


// route
app.get('/', function(req, res){
	res.render('index', {title: 'Weather:: Main'});
});
app.get('/all', function(req, res){
	res.render('all', {title: 'Weather:: All'});
});
app.get('/local', function(req, res){
	res.render('local', {title: 'Weather:: Local'});
});
