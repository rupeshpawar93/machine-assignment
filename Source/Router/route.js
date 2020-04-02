const express = require("express");
const router = new express.Router();
var UserController = require("./../Controller/UserController");

/**router are defined here **/
router.post("/register", UserController.register);

module.exports = router;
