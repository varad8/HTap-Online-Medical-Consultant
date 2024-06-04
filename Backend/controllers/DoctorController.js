const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const { authenticateToken } = require("../middlewares/authentication");
const bcrypt = require("bcrypt");
const Doctor = require("../models/Doctor");
const {
  getChartOfAllBookingsDID,
  getChartDataByVisitingStatusAndDID,
  getAllBookingByDoctorId,
  getBookingByAppointmentId,
  WeeklyDataDID,
  MonthlyDataDID,
  YearlyDataPID,
  YearlyDataDID,
} = require("./operations/booking");
const {
  getAllPrescriptionUsingPID,
  getAllPRescriptionByDID,
  savePrescription,
  getPrescriptionByPresID,
  updatePrescription,
  getPrescriptionChartByDID,
} = require("./operations/prescription");
const { getSpecailistList } = require("./operations/doctor");
const {
  fetchChartPayments,
  fetchChartPaymentsByDID,
  fetchAllPaymentsBYDID,
  sendInvoice,
} = require("./PaymentCotroller");
const { getNotificationByDID } = require("./operations/ratenotification");
const { SECRET_KEY } = process.env;

const router = express.Router();

// Define multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder for file uploads
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    // Generate a timestamp
    const timestamp = Date.now();
    // Get the file extension
    const ext = path.extname(file.originalname);
    // Set the filename to be the timestamp, underscore, and file extension
    const filename = `${timestamp}_${file.originalname}`;
    cb(null, filename);
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage }).single("file");

// Register a new doctor
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, confirmpassword, role } = req.body;

    console.log(req.body);

    // Validate required fields
    if (!username || !email || !password || !confirmpassword || !role) {
      return res
        .status(400)
        .json({ error: "Username, email, and password are required" });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({ error: "Password do not match" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance with hashed password
    const user = new User({ username, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Doctor login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    // If user not found or password doesn't match
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "24h",
    });
    const userdata = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    // Send token in response
    res.json({ token: token, user: userdata });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// Get  doctor (protected route)
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    // Find the doctor profile by user ID
    const doctor = await Doctor.findOne({ d_id: req.user.userId });
    if (!doctor) {
      return res.status(404).json({ error: "Create your profile first" });
    }

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create doctor Profile When doctor First Login
router.post("/profile/create", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    // Check if a doctor profile with the same d_id already exists
    const existingDoctor = await Doctor.findOne({ d_id: req.user.userId });
    if (existingDoctor) {
      return res.status(400).json({ error: "Doctor profile already exists" });
    }

    if (!user) {
      throw new Error("User not found");
    }

    upload(req, res, async (err) => {
      const {
        firstname,
        lastname,
        address,
        city,
        state,
        email,
        contact,
        servicehours,
        occupation,
        exp,
        username,
      } = req.body;
      if (
        !firstname ||
        !lastname ||
        !address ||
        !city ||
        !state ||
        !email ||
        !contact ||
        !servicehours ||
        !occupation ||
        !exp ||
        !username
      ) {
        return res
          .status(400)
          .json({ error: "All profile fields are required" });
      }

      if (contact.length > 10) {
        return res
          .status(400)
          .json({ error: "Mobile no. not valid must be 10 digit" });
      }

      if (err) {
        console.error("Error uploading file:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (!req.file) {
        return res.status(400).json({ error: "Profile picture is required" });
      }

      const fileName = req.file.filename;
      const location = {
        city: city,
        state: state,
      };

      const doctor = new Doctor({
        d_id: req.user.userId,
        d_username: user.username,
        d_firstname: firstname,
        d_lastname: lastname,
        d_address: address,
        d_location: location,
        d_email: email,
        d_contact: contact,
        d_exp: exp,
        occupation: occupation,
        d_profile_pic: fileName,
        servicehours: JSON.parse(servicehours),
      });

      await doctor.save();
      res.status(201).json({ message: "doctor profile created successfully" });
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

//View doctor Profile Image from server
router.get("/profile/:image", async (req, res) => {
  try {
    const fileName = req.params.image;

    if (!fileName) {
      return res.status(404).json({ error: "file name not found" });
    }
    // Construct the file path to the profile picture
    const filePath = path.join(__dirname, `../uploads/${fileName}`);

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).json({ error: "Profile picture not found" });
      }

      // Send the file as a response
      res.sendFile(filePath);
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update doctor profile details and profile image
router.put("/profile/update", authenticateToken, async (req, res) => {
  try {
    // Handle file upload
    upload(req, res, async (err) => {
      const {
        firstname,
        lastname,
        address,
        city,
        state,
        email,
        contact,
        servicehours,
        occupation,
        exp,
      } = req.body;

      // Find the doctor profile by user ID
      const doctor = await Doctor.findOne({ d_id: req.user.userId });

      if (!doctor) {
        return res.status(404).json({ error: "Doctor profile not found" });
      }

      if (err) {
        console.error("Error uploading file:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      let fileName = doctor.d_profile_pic;
      if (req.file) {
        // Delete old profile picture file if it exists
        if (doctor.d_profile_pic) {
          const filePath = path.join(
            __dirname,
            `../uploads/${doctor.d_profile_pic}`
          );
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }

        // Assign new profile picture file name
        fileName = req.file.filename;
      }

      // Update selected fields in the doctor profile
      if (firstname) doctor.d_firstname = firstname;
      if (lastname) doctor.d_lastname = lastname;
      if (address) doctor.d_address = address;
      if (city && state) doctor.d_location = { city, state };
      if (email) doctor.d_email = email;
      if (contact) doctor.d_contact = contact;
      if (servicehours) doctor.servicehours = JSON.parse(servicehours);
      if (exp) doctor.d_exp = exp;
      if (occupation) doctor.occupation = occupation;
      if (req.file) doctor.d_profile_pic = fileName;

      // Save the updated doctor profile
      await doctor.save();
      res.status(200).json({ message: "Doctor profile updated successfully" });
    });
  } catch (error) {
    console.error("Error updating doctor profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//get Specailist category
router.route("/specailist/all").get(getSpecailistList);

/**_______________________________[CHART START]_____________________________________ */
router
  .route("/booking/chart/:did")
  .get(authenticateToken, getChartOfAllBookingsDID);

router
  .route("/booking/visiting/chart/:did")
  .get(authenticateToken, getChartDataByVisitingStatusAndDID);
router
  .route("/prescription/chart/:d_id")
  .get(authenticateToken, getPrescriptionChartByDID);

router
  .route("/payment/chart/:did")
  .get(authenticateToken, fetchChartPaymentsByDID);

/**_______________________________[END START]_____________________________________ */

/**______________________________[Booking START]___________________________ */

//Get all booking by doctor id
router
  .route("/booking/alldata/:did")
  .get(authenticateToken, getAllBookingByDoctorId);

//Get bookings by appointment id
router
  .route("/booking/:appointmentid")
  .get(authenticateToken, getBookingByAppointmentId);

/**______________________________[Booking END]___________________________ */

/**______________________________[PRESCRIPTION START]___________________________ */
router.route("/prescription/save").post(authenticateToken, savePrescription);
router
  .route("/prescription/update/:id")
  .put(authenticateToken, updatePrescription);
router
  .route("/prescriptions/:did")
  .get(authenticateToken, getAllPRescriptionByDID);
router
  .route("/prescriptions/presid/:pres_id")
  .get(authenticateToken, getPrescriptionByPresID);

/**______________________________[PRESCRIPTION END]___________________________ */

/**______________________________[Payment Start]___________________________ */
router.route("/payment/:d_id").get(authenticateToken, fetchAllPaymentsBYDID);

// Notification of ratings

router
  .route("/notification/get/did/:d_id")
  .get(authenticateToken, getNotificationByDID);

router.route("/invoice/send/:pay_id").get(authenticateToken, sendInvoice);

router.route("/reports/weekly/:did").get(WeeklyDataDID);
router.route("/reports/monthly/:did").get(MonthlyDataDID);
router.route("/reports/yearly/:did").get(YearlyDataDID);

module.exports = router;
