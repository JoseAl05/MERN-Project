const session = require('express-session');
const clientDB = require('../db');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo');

dotenv.config();

const setUpSession = (app) => {
    app.use(session({
        secret:process.env.SESSION_KEY,
        resave:false,
        saveUninitialized:false,
        store:MongoStore.create({
            clientPromise:clientDB,
            dbName:process.env.DB_NAME,
            touchAfter: 24 * 3600,
            autoRemove: 'native'
        }),
        cookie:{
            maxAge:15 * 24 * 60 *60 * 1000,
        }
    }))
}
module.exports = setUpSession;