const express = require("express");
const router = express();
const userController = require("../../controller/user-controller/user");
//const verify = require("../../helpers/verify-user/verify");

//router.get("/profile", verify, userController.Profile );

// user register
router.post("/register", userController.Signup);

//user login
router.post("/login", userController.Signin);


module.exports = router;