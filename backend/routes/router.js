const userController = require('../controllers/userController');
const router = require('express').Router();
const {signUpSchema} = require('../middleware/signUpValidator');
const {checkSchema} = require('express-validator');
const { signInSchema } = require('../middleware/signInValidator');
const verifyUserSession = require('../middleware/verifyUserSession');
// const verifySignUp = require('../middleware/verifySignUp');
// const authJwt = require('../middleware/authJwt');

router.use(function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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

module.exports = router;