const passport = require('passport');
const User = require("../models/User");

const setUpPassport = (app)=>{

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user,done) =>
        done(null,{id:user._id,username:user.username})
    )
    passport.deserializeUser(async(user,done) =>{
        const userDB = await User.findById(user.id);
        return done(null,{id:userDB._id,username:userDB.username});
    })
}


module.exports = setUpPassport;