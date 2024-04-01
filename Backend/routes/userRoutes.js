const express = require("express");
const userController = require("../controllers/UserController");

const router = express.Router();

router.use("/users", userController);

module.exports = router;
