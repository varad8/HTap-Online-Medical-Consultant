const express = require("express");
const userController = require("../controllers/AdminController");

const router = express.Router();

router.use("/admin", userController);

module.exports = router;
