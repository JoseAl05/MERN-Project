const userController = require('../controllers/userController');
const router = require('express').Router();
// const verifySignUp = require('../middleware/verifySignUp');
// const authJwt = require('../middleware/authJwt');

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "x-access-token,Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.post("/test/",userController.registerUser);
router.get("/confirm-account/:confirmToken",userController.confirmToken);
router.post("/signin/",userController.loginUser);

module.exports = router;