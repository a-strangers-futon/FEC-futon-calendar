var express = require('express');
var compression = require('compression')
var app = express();
var path = require('path');
var bodyParse = require('body-parser');
var db = require('../database/index.js');

var port = 3002;

app.set('port', port);
app.use(compression())

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParse.json());
app.set('json spaces', 2);

app.get('/api/schedule/:listingId', function(req, res){
  var listingId = Number(req.params.listingId);
  db.findSchedule(listingId, function(error, results) {
    res.send(results);
  });
});

app.listen(app.get('port'));
