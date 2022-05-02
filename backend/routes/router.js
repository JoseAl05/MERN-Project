const userController = require('../controllers/userController');
const router = require('express').Router();
const {signUpSchema} = require('../middleware/signUpValidator');
const {checkSchema} = require('express-validator');
const { signInSchema } = require('../middleware/signInValidator');
const verifyUserSession = require('../middleware/verifyUserSession');
const axios = require('axios');
require('dotenv').config();
const API_KEY = process.env.API_KEY;
const URL_LIST_OF_GAMES = process.env.API_URL_LIST_OF_GAMES;

router.use(function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// * AUTHENTICATION * //
router.post("/signup/",checkSchema(signUpSchema),verifyUserSession,userController.registerUser);
router.get("/confirm-account/:confirmToken",userController.confirmToken);
router.post("/signin/",checkSchema(signInSchema),userController.loginUser);
router.get("/logout/",verifyUserSession,userController.logout);
router.get("/logged-user/",verifyUserSession,(req,res) => {
    return res.json(req.user);
})
router.get("/getCSRFToken/",(req,res) => {
    return res.json(req.csrfToken());
})

// * API CALLS * //
router.get('/getAllGames/:currentPage',async(req,res) => {
    try{
        const apiRes = await axios.get(URL_LIST_OF_GAMES + '?key=' + API_KEY + '&page=' + req.params.currentPage + '&page_size=5')
        if(apiRes.status === 200){
            return res.status(200).json(apiRes.data);
        }
    }catch(error){
        res.status(500).send(error);
    }
})
router.get('/searchGame/:gameSearched',async(req,res) => {
    console.log(req.params)
    try{
        const apiRes = await axios.get(URL_LIST_OF_GAMES + '?key=' + API_KEY + '&search=' + req.params.gameSearched)
        if(apiRes.status === 200){
            return res.status(200).json(apiRes.data);
        }
    }catch(error){
        res.status(500).send(error);
    }
})

module.exports = router;