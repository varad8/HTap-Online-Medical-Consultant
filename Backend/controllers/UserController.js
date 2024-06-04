const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Patient = require("../models/Patient");
const Admin = require("../models/Admin");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const { authenticateToken } = require("../middlewares/authentication");
const bcrypt = require("bcrypt");
const { EMAIL_USER, EMAIL_PASSWORD, YOUR_EMAIL } = process.env;
const nodemailer = require("nodemailer");
const {
  saveBookings,
  getBookingByAppointmentId,
  getAllBookingByPatientId,
  getAllBookingByDoctorId,
  getAllBookings,
  getChartOfAllBookings,
  getChartOfAllBookingsPID,
  getChartOfAllBookingsDID,
  updateBookingStatus,
  cancelBookingById,
  getChartDataByVisitingStatusAndPID,
  WeeklyDataPID,
  MonthlyDataPID,
  YearlyDataPID,
} = require("./operations/booking");

const {
  savePrescription,
  getAllPrescription,
  getAllPrescriptionUsingPID,
  getPrescriptionByPresID,
  getPrescriptionChartByPID,
} = require("./operations/prescription");
const {
  createOrder,
  fetchPaymentsForOrder,
  fetchChartPayments,
  fetchAllPaymentsBYPID,
  sendInvoice,
} = require("./PaymentCotroller");

const {
  getNotificationId,
  saveNotification,
  deleteNotificationById,
  updateNotificationById,
  getNotificationByPID,
  getNotificationByDID,
  getAllNotification,
} = require("./operations/ratenotification");

const { SECRET_KEY } = process.env;
const moment = require("moment");
const {
  getDoctorsByLocationAndStatus,
  getDoctorById,
  getSpecailistList,
  getAllDoctors,
} = require("./operations/doctor");
const Doctor = require("../models/Doctor");

// Configure nodemailer with your email transport settings
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

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

// Register a new user
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

// User login
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

// Get user profile (protected route)
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    // Find the patient profile by user ID
    const patient = await Patient.findOne({ pid: req.user.userId });
    if (!patient) {
      return res.status(404).json({ error: "Create your profile first" });
    }

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create Profile When User First Login
router.post("/profile/create", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      // throw new Error("User not found");

      // change it to
      throw new Error("Create Profile");
    }

    // Check if a Patient profile with the same p_id already exists
    const existingPatient = await Patient.findOne({ pid: req.user.userId });
    if (existingPatient) {
      return res.status(400).json({ error: "Patient profile already exists" });
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
        !username
      ) {
        return res
          .status(400)
          .json({ error: "All profile fields are required" });
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

      const patient = new Patient({
        pid: req.user.userId,
        p_username: user.username,
        p_firstname: firstname,
        p_lastname: lastname,
        p_add: address,
        p_location: location,
        p_email: email,
        p_contact: contact,
        p_profile_pic: fileName,
        p_username: username,
      });

      await patient.save();
      res.status(201).json({ message: "Patient profile created successfully" });
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

//View User/Patient Profile Image from server
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

// Update profile details and profile image
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
        username,
      } = req.body;

      // Find the patient profile by user ID
      const patient = await Patient.findOne({ pid: req.user.userId });
      if (!patient) {
        return res.status(404).json({ error: "Patient profile not found" });
      }

      if (err) {
        console.error("Error uploading file:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      let fileName = patient.p_profile_pic;

      if (req.file) {
        // Delete old profile picture file if it exists
        if (patient.p_profile_pic) {
          const filePath = path.join(
            __dirname,
            `../uploads/${patient.p_profile_pic}`
          );
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }

        // Assign new profile picture file name
        fileName = req.file.filename;
      }

      // Update selected fields in the patient profile
      if (firstname) patient.p_firstname = firstname;
      if (lastname) patient.p_lastname = lastname;
      if (address) patient.p_add = address;
      if (city && state) patient.p_location = { city, state };
      if (email) patient.p_email = email;
      if (contact) patient.p_contact = contact;
      if (username) patient.p_username = username;
      if (req.file) patient.p_profile_pic = fileName;

      // Save the updated patient profile
      await patient.save();
      res.status(200).json({ message: "Patient profile updated successfully" });
    });
  } catch (error) {
    console.error("Error updating patient profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**___________________________________[Get doctor based on Location]________________________________________ */
router.route("/doctor/location").get(getDoctorsByLocationAndStatus);
router.route("/doctor/details/:doctorId").get(getDoctorById);
router.route("/specailist/all").get(getSpecailistList);

router.route("/doctor/all").get(getAllDoctors);

/**________________________________________{Booking START}___________________________________________________ */
//save bookings
router.route("/booking/save").post(authenticateToken, saveBookings);

//cancel booking status
router.route("/booking/cancel").put(authenticateToken, updateBookingStatus);

//Get bookings by appointment id
router
  .route("/booking/:appointmentid")
  .get(authenticateToken, getBookingByAppointmentId);

//Get All booking by patient id
router
  .route("/booking/all/:pid")
  .get(authenticateToken, getAllBookingByPatientId);

router.route("/booking/cancel/:id").put(authenticateToken, cancelBookingById);

/**________________________________________{Booking END}___________________________________________________ */

/**________________________________________{Prescription START}___________________________________________________ */
router
  .route("/prescriptions/:pid")
  .get(authenticateToken, getAllPrescriptionUsingPID);
router
  .route("/prescriptions/presid/:pres_id")
  .get(authenticateToken, getPrescriptionByPresID);

// Payments
router.route("/payments/create").post(authenticateToken, createOrder);
router.route("/payments/save").post(authenticateToken, fetchPaymentsForOrder);

/**________________________________________{Prescription END}___________________________________________________ */

/**______________________________[Payment Start]___________________________ */
router.route("/payment/:pid").get(authenticateToken, fetchAllPaymentsBYPID);

/**-------------------------[Chart Visualization ]---------------------- */
router
  .route("/booking/chart/:pid")
  .get(authenticateToken, getChartOfAllBookingsPID);

router
  .route("/booking/visiting/chart/:pid")
  .get(authenticateToken, getChartDataByVisitingStatusAndPID);

router
  .route("/prescriptions/chart/:pid")
  .get(authenticateToken, getPrescriptionChartByPID);
router.route("/payment/chart/:pid").get(authenticateToken, fetchChartPayments);

/**----------------[Get Profile ]----------------------- */
router.get("/profile/get/:userid", authenticateToken, async (req, res) => {
  try {
    const userId = req.params.userid;
    let user;

    // Find the user based on their ID
    const patient = await Patient.findOne({ pid: userId });
    const doctor = await Doctor.findOne({ d_id: userId });
    const admin = await Admin.findOne({ aid: userId });

    // Check if any user type is found
    if (!patient && !doctor && !admin) {
      // If user is not found, return a 404 error
      return res.status(404).json({ error: "User not found" });
    }

    // Determine the user's role and assign the user variable accordingly
    if (patient) {
      user = patient;
    } else if (doctor) {
      user = doctor;
    } else {
      user = admin;
    }

    // Extract necessary information from the user profile
    const userProfile = {
      name: user.p_firstname
        ? `${user.p_firstname} ${user.p_lastname}`
        : user.d_firstname
        ? `${user.d_firstname} ${user.d_lastname}`
        : `${user.a_firstname} ${user.a_lastname}`,
      email: user.p_email || user.a_email || user.d_email,
      contact: user.p_contact || user.a_contact || user.d_contact,
      role: patient ? "patient" : doctor ? "doctor" : "admin",
      profilePic:
        user.p_profile_pic || user.a_profile_pic || user.d_profile_pic,
    };

    // Return the user profile
    res.status(200).json(userProfile);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: "Internal server error" });
  }
});

/**----------------[Save/Update Notification ]----------------------- */
router.route("/notification/:id").get(authenticateToken, getNotificationId);
router.route("/notification/save").post(authenticateToken, saveNotification);
router
  .route("/notification/update/:id")
  .put(authenticateToken, updateNotificationById);
router
  .route("/notification/delete/:id")
  .delete(authenticateToken, deleteNotificationById);
router
  .route("/notification/get/pid/:pid")
  .get(authenticateToken, getNotificationByPID);

router
  .route("/notification/get/all")
  .get(authenticateToken, getAllNotification);

// Send Message router
router.post("/sendmessage", async (req, res) => {
  try {
    const { email, message, name } = req.body;
    if (!email || !message || !name) {
      return res.status(404).json({ error: "Fields cant be empty" });
    }

    // HTML body of the email
    const htmlBody = `
    <h2>${name}</h2>
    <p>${email}</p>
      <p>${message}</p>
    `;

    // Email options
    const mailOptions = {
      from: YOUR_EMAIL,
      to: email,
      subject: "Contact Support",
      html: htmlBody,
    };

    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        // res.status(500).json({ error: error.message });
        return res.status(500).json({ error: "Error sending email" });
      } else {
        res.status(200).json({
          message:
            "Thank you for contacting our customer support will response to you",
        });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.route("/reports/weekly/:pid").get(authenticateToken, WeeklyDataPID);
router.route("/reports/monthly/:pid").get(authenticateToken, MonthlyDataPID);
router.route("/reports/yearly/:pid").get(authenticateToken, YearlyDataPID);
router.route("/invoice/send/:pay_id").get(authenticateToken, sendInvoice);

module.exports = router;
