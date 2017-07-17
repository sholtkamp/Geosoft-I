/**
 * authors: Jan-Patrick Bollow 349891, Jan Tebrügge
 *
 */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// New Code
// to add mongodb functionalities
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/leaflet_map');

// var index differs from routes in the tutorial
// removed users
var index = require('./app_client/js/index');

var app = express();

// view engine setup
app.set('view engine', 'jade');


app.use(express.static(path.join(__dirname, 'app_client')));

// CORS to avoid cross-origin errors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Added favicon.ico
app.use(favicon(path.join(__dirname, 'app_client/img', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

// Make our db accessible to our router
app.use(function (req, res, next) {
  req.db = db;
  next();
});

app.use('/', index);

// catch 404 and forward to error handler
// development 404 page
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;