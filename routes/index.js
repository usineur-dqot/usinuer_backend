const express = require("express");
const router = express();
const userRoute = require("../routes/user/user");

router.use("/user", userRoute);

module.exports = router;