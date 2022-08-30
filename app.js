var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var router = express.Router();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/api/v1',(req,res,next)=>{
//     next();
// })

router.use((req, res, next) => {
    console.log('%s %s %s', req.method, req.url, req.path);
    next();
  });

router.use('/api/v1',(req,res,next)=>{
    console.log('this route pass');
    next();
})

app.use('/api/v1', indexRouter);
app.use('/api/v1/users', usersRouter);


console.log("App listen on port 3000");

module.exports = app;
