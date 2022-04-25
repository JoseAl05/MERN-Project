const express = require('express');
const path = require('path');
const morgan = require('morgan');
const appRouter = require("./routes/router");
const csrf = require('csurf');
const { cookie } = require('express-validator');
const setUpSession = require('./middleware/sessions');
const setUpPassport = require('./middleware/passport');
const setUpCors = require('./middleware/cors');


const app = express();


require('dotenv').config()
setUpCors(app);
setUpSession(app);
app.use(csrf({
  cookie:false
}));
setUpPassport(app);


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