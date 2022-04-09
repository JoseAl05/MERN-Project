const User = require("../models/User");
const {nanoid} = require("nanoid");
const bcrypt = require('bcryptjs');

const registerUser = async(req,res) => {
    await User.findOne({
        email:req.body.email,
    })
    .then(user => {
        if(!user){
            const newUser = new User({
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                tokenConfirm:nanoid(),
            })
            newUser.save();

            return res.status(200).json(newUser);
        }
        return res.status(403).send({message:'User already exists!'});
    })
    .catch(error => {
        return res.status(500).send({error:error.message});
    })
}

const loginUser = async(req,res)=>{
    await User.findOne({
        email:req.body.email,
    })
    .then(user => {
        if(!user){
            return res.status(404).send({message:'User does not exists!'});
        }

        if(!user.confirmAccount){
            return res.status(401).send({message:'You need to confirm your account to login!'})
        }

        const hashedPassword = req.body.password;
        const passwordIsValid = bcrypt.compareSync(hashedPassword,user.password);

        if(!passwordIsValid){
            return res.status(401).send({message:'Password invalid!'});
        }

        return res.status(200).json(user);

    })
    .catch(error => {
        return res.status(500).send({error:error.message});
    })
}

const confirmToken = async(req,res) => {

    await User.findOne({
        tokenConfirm:req.params.confirmToken,
    })
    .then(user => {
        if(!user){
            res.status(404).send({message:'Not found that User!'});
            return;
        }
        user.confirmAccount = true;
        user.tokenConfirm = null;

        res.status(200).json(user);
    })
    .catch(error => {
        res.status(500).send({error:error.message});
    })
}

module.exports = {
    registerUser,
    confirmToken,
    loginUser
}