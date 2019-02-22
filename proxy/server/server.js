var express = require('express');
var app = express();
var path = require('path');
var port = 3000;

app.set('port', port);

app.use(express.static(path.join(__dirname, '../client')));

app.listen(app.get('port'));
