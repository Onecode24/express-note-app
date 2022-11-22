let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyparser = require('body-parser')
let mongoose = require('mongoose')
let cors = require('cors')

require('dotenv').config()



let app = express();

let indexRouter = require('./app/controllers/index')
let usersRouter = require('./app/controllers/users')
 


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))

// Headers fo request and response
app.use(cors())

// Try connect app to mongo database in local
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then((res)=>{
    console.log('App connect to mongoDB ');
})
.catch((error)=>{
    console.log(error,'\n Failed to connect to mongodb');
})

// Routing
app.use('/api', indexRouter)
app.use('/api/users', usersRouter)

console.log("App listen on port 3000");

module.exports = app;
