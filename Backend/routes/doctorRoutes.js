const express = require("express");
const doctorController = require("../controllers/DoctorController");

const router = express.Router();

router.use("/doctor", doctorController);

module.exports = router;
