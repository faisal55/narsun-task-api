const express           =      require('express');
const app               =      express();
const morgan            =      require('morgan');
const bodyParser        =      require('body-parser');
const mongoose          =      require('mongoose');
const config            =      require('./config/database');
const cors              =      require('cors');

require('dotenv').config();

//  REQUIRING ALL ROUTES
const userRoutes        =      require('./server/routes/user');
const deviceRoutes      =      require('./server/routes/device');
const settingRoutes     =      require('./server/routes/setting');

// Connect to database
mongoose.connect(config.database, {useNewUrlParser : true});
mongoose.set('useCreateIndex', true);

// On Connection
mongoose.connection.on('connected', function(){
  console.log('Connected to Database mongo @ 27017' +config.database);
});

// On Error
mongoose.connection.on('Error', function(err){
  console.log('Error in Database Connention' +err);
});

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json());
app.use(cors());

// Routes which handle requests
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/device', deviceRoutes);
app.use('/api/v1/settings', settingRoutes);

// Error handling
app.use(function(req, res, next){
  const error  = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use(function(error, req, res, next){
  res.status(error.status || 500);
  res.json({
    error : {
      message : error.message
    }
  });
});

module.exports = app;
