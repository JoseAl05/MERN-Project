const express = require('express');
const path = require('path');
const morgan = require('morgan');
// const appRouter = require("./routes/router");
const cors = require("cors");
const session = require('express-session');
require('./db');


var app = express();


require('dotenv').config()
app.use(
  cors({
    credentials:true,
    origin:'http://localhost:3000',
  })
);
app.use(session({
    secret:'loalskwiaj',
    resave:true,
    saveUninitialized:true,
}))

app.set('port',process.env.PORT || 5000);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/api', appRouter);
app.listen(app.get('port'), () => {
  console.log("Server Started on port", app.get('port'));
})

module.exports = app;