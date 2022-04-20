const express = require('express');
const path = require('path');
const morgan = require('morgan');
const appRouter = require("./routes/router");
const cors = require("cors");
const session = require('express-session');
const passport = require('passport');
const csrf = require('csurf');
const MongoStore = require('connect-mongo');
const User = require("./models/User");
const clientDb = require('./db');
const { cookie } = require('express-validator');


var app = express();


require('dotenv').config()
app.use(
  cors({
    credentials:true,
    origin:'http://localhost:3000',
  })
);

app.use(session({
  secret:process.env.SESSION_KEY,
  resave:false,
  saveUninitialized:false,
  store:MongoStore.create({
    clientPromise:clientDb,
    dbName:process.env.DB_NAME,
    touchAfter: 24 * 3600,
    autoRemove: 'native'
  }),
  cookie:{
    maxAge:15 * 24 * 60 *60 * 1000
  }
}))

app.use(csrf());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user,done) =>
  done(null,{id:user._id,username:user.username})
)
passport.deserializeUser(async(user,done) =>{
  const userDB = await User.findById(user.id);
  return done(null,{id:userDB._id,username:userDB.username});
})

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));

app.use(morgan('dev'));
app.use(express.json());

app.use('/api', appRouter);
app.set('port',process.env.PORT || 5000);
app.listen(app.get('port'), () => {
  console.log("Server Started on port", app.get('port'));
})

module.exports = app;