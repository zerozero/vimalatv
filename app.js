var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var boolParser = require('express-query-boolean');
var mongoose = require('mongoose');

var appRoutes = require('./routes/app');
var gigRoutes = require('./routes/gig');
var artistRoutes = require('./routes/artist');
var collabRoutes = require('./routes/collab');

var app = express();

console.log("connecting to  "+process.env.NODE_ENV);
const URL = (process.env.NODE_ENV === 'production') ? process.env.MONGOHQ_URL
    : 'localhost:27017/vimala-tv';

mongoose.connect(URL);
mongoose.connection.on('error', console.error.bind(console, 'An error occurred with the DB connection: '));
// mongoose.connect('localhost:27017/vimala-tv');//the name of the database: vimala-tv

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(boolParser());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/collab', collabRoutes);
app.use('/artist', artistRoutes);
app.use('/gig', gigRoutes);
app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('index');
});


module.exports = app;
