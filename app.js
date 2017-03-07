var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mustacheExpress = require('mustache-express');


var index = require('./routes/index');
var a1 = require('./routes/a1');

var a2 = require('./routes/a2');
var a4 = require('./routes/a4');

var csrf = require('./routes/csrf');
var forward = require('./routes/forward');
var sql = require('./routes/sql');


var views = path.join(__dirname, 'views');
var partials = path.join(__dirname, 'partials');
var engine = mustacheExpress(partials, 'partial');

var app = express();

app.engine('mustache', engine);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.use('/a1', a1);
app.use('/a2', a2);
app.use('/a4', a4);

app.use('/csrf', csrf);
app.use('/forward', forward);
app.use('/sql', sql);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
