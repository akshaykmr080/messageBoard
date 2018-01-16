var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var messageRoutes = require('./routes/message');
var userRoutes = require('./routes/user');
var authRoutes = require('./routes/auth');
var mongoose = require('mongoose');

var app = express();
mongoose.Promise = global.Promise;
mongoose.connect('user:1234@ds255767.mlab.com:55767/messageboard-akshay-shreekanth');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-auth');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});




app.use('/users', userRoutes)
app.use('/auth', authRoutes);
app.use('/messages', messageRoutes);

app.use('/', (req,res,next) => {
    return res.render('index');
})

app.use(function (req, res, next) {
    return res.render('index');
});


module.exports = app;
