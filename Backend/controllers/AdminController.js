const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const { authenticateToken } = require("../middlewares/authentication");
const bcrypt = require("bcrypt");
const { EMAIL_USER, EMAIL_PASSWORD, YOUR_EMAIL } = process.env;
const { SECRET_KEY } = process.env;
const moment = require("moment");
const Admin = require("../models/Admin");
const User = require("../models/User");
const Patient = require("../models/Patient");
const Specialist = require("../models/specialistModel");
const ejs = require("ejs");
const nodemailer = require("nodemailer");
const {
  getChartOfAllBookings,
  getAllBookings,
  WeeklyDataAll,
  MonthlyDataAll,
  YearlyDataAll,
  WeeklyDataAllDoctor,
  MonthlyDataAllDoctor,
  YearlyDataAllDoctor,
  getChartDataByVisitingStatus,
} = require("./operations/booking");
const {
  getAllPrescriptionChart,
  getAllPrescription,
} = require("./operations/prescription");
const {
  getPrescriptionAndPaymentData,
  fetchAllChartPayment,
  fetchAllPayments,
} = require("./PaymentCotroller");
const {
  getAllDoctors,
  updateDoctorAccountStatus,
} = require("./operations/doctor");
const Doctor = require("../models/Doctor");
const { getAllNotification } = require("./operations/ratenotification");

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

// Configure nodemailer with your email transport settings
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage }).single("file");

// Register a new admin
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Username, email, and password are required" });
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

// Admin login
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

// Forgot password
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    // Validate required fields
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate JWT token for password reset (assuming a short expiry time for security)
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "15m",
    });

    // Construct the password reset link
    const resetLink = `http://localhost:5000/api/admin/reset-password/${token}`;

    // HTML body of the email
    const htmlBody = `
      <p>You have requested a password reset for your account.</p>
      <p>Please click on the following link to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>If you did not request this, please ignore this email.</p>
    `;

    // Email options
    const mailOptions = {
      from: YOUR_EMAIL,
      to: email,
      subject: "Password Reset Link",
      html: htmlBody,
    };

    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.status(500).json({ error: error.message });
        return res.status(500).json({ error: "Error sending email" });
      } else {
        console.log("Email sent:", info.response);
        res
          .status(200)
          .json({ message: "Password reset link sent to your email" });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reset password
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Validate required fields
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    // Verify and decode the token
    const decodedToken = jwt.verify(token, SECRET_KEY);
    const userId = decodedToken.userId;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to render the password reset form
router.get("/reset-password/:token", (req, res) => {
  const { token } = req.params;
  const { error } = req.query;
  res.render("resetPassword", { token, error });
});

// Get user profile (protected route)
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    // Find the admin profile by user ID
    const admin = await Admin.findOne({ aid: req.user.userId });

    if (!admin) {
      return res.status(404).json({ error: "Admin profile not found" });
    }

    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create Profile When Admin First Login
router.post("/profile/create", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Check if a Admin profile with the same aid already exists
    const existingAdmin = await Admin.findOne({ aid: req.user.userId });
    if (existingAdmin) {
      return res.status(400).json({ error: "Admin profile already exists" });
    }

    upload(req, res, async (err) => {
      const { firstname, lastname, address, email, contact } = req.body;
      if (!firstname || !lastname || !address || !email || !contact) {
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

      const admin = new Admin({
        aid: req.user.userId,
        a_username: user.username,
        a_firstname: firstname,
        a_lastname: lastname,
        a_address: address,
        a_email: email,
        a_contact: contact,
        a_profile_pic: fileName,
      });

      await admin.save();
      res.status(201).json({ message: "Admin profile created successfully" });
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

//View Admin Profile Image from server
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
      const { firstname, lastname, address, email, contact } = req.body;

      console.log(req.body);

      // Find the admin profile by user ID
      const admin = await Admin.findOne({ aid: req.user.userId });
      if (!admin) {
        return res.status(404).json({ error: "Admin profile not found" });
      }

      if (err) {
        console.error("Error uploading file:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      let fileName = admin.a_profile_pic;
      if (req.file) {
        // Delete old profile picture file if it exists
        if (admin.a_profile_pic) {
          const filePath = path.join(
            __dirname,
            `../uploads/${admin.a_profile_pic}`
          );
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }

        // Assign new profile picture file name
        fileName = req.file.filename;
      }

      // Update selected fields in the Admin profile
      if (firstname) admin.a_firstname = firstname;
      if (lastname) admin.a_lastname = lastname;
      if (address) admin.a_address = address;
      if (email) admin.a_email = email;
      if (contact) admin.a_contact = contact;
      if (req.file) admin.a_profile_pic = fileName;

      // Save the updated Admin profile
      await admin.save();
      res.status(200).json({ message: "Admin profile updated successfully" });
    });
  } catch (error) {
    console.error("Error updating admin profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**_____________________________{Specailist Add}__________________________________________ */
// Add new specialist
router.post("/specialist/add", authenticateToken, async (req, res) => {
  try {
    const { name, description, link } = req.body;

    if (!name || !description || !link) {
      return res.status(404).json({ error: "Fields cant blank" });
    }

    // Create a new specialist
    const newSpecialist = new Specialist({
      name,
      description,
      link,
    });

    // Save the specialist to the database
    await newSpecialist.save();
    res.status(201).json({
      message: "Specialist added successfully",
      specialist: newSpecialist,
    });
  } catch (error) {
    console.error("Error adding specialist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete specialist
router.delete("/specialist/delete/:id", authenticateToken, async (req, res) => {
  try {
    const specialistId = req.params.id;

    // Find and delete the specialist by ID
    const deletedSpecialist = await Specialist.findByIdAndDelete(specialistId);
    if (!deletedSpecialist) {
      return res.status(404).json({ error: "Specialist not found" });
    }

    res.status(200).json({ message: "Specialist deleted successfully" });
  } catch (error) {
    console.error("Error deleting specialist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update specialist details
router.put("/specialist/update/:id", authenticateToken, async (req, res) => {
  try {
    const specialistId = req.params.id;
    const { name, description, link } = req.body;

    // Find the specialist by ID
    const specialist = await Specialist.findById(specialistId);
    if (!specialist) {
      return res.status(404).json({ error: "Specialist not found" });
    }

    // Update specialist details
    if (name) specialist.name = name;
    if (description) specialist.description = description;
    if (link) specialist.link = link;

    // Save the updated specialist
    await specialist.save();
    res
      .status(200)
      .json({ message: "Specialist updated successfully", specialist });
  } catch (error) {
    console.error("Error updating specialist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/specialist/all", authenticateToken, async (req, res) => {
  try {
    // Find the specialist by ID
    const specialist = await Specialist.find();

    res.status(200).json(specialist);
  } catch (error) {
    console.error("Error updating specialist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**__________________________{BOOKING START}______________________________________________ */
router.route("/bookings/all").get(authenticateToken, getAllBookings);
router.route("/prescriptions/all").get(authenticateToken, getAllPrescription);
router.route("/payments/all").get(authenticateToken, fetchAllPayments);

/**__________________________{BOOKING END}______________________________________________ */

/**__________________________{Chart VISUALIZAATION START}______________________________________________ */

router.route("/booking/chart").get(authenticateToken, getChartOfAllBookings);
router
  .route("/prescriptions/chart")
  .get(authenticateToken, getAllPrescriptionChart);
router.route("/payment/chart").get(authenticateToken, fetchAllChartPayment);

/**__________________________{GET ALL DATA OF DOCTOR AND USER}______________________________________________ */
router.route("/data/doctors").get(authenticateToken, getAllDoctors);

router.get("/data/users", authenticateToken, async (req, res) => {
  try {
    // Fetch all patients from the database
    const patients = await Patient.find();

    // Convert timestamps to readable format
    const formattedPatients = patients.map((patient) => ({
      ...patient.toObject(),
      createdAt: moment(patient.createdAt).format("DD/MM/YYYY HH:mm:ss"),
    }));

    // Respond with the list of patients
    res.status(200).json(formattedPatients);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: "Internal server error" });
  }
});

router
  .route("/doctor/update/:doctorId")
  .put(authenticateToken, updateDoctorAccountStatus);

//notifications of ratings
router
  .route("/notification/get/all")
  .get(authenticateToken, getAllNotification);

router
  .route("/booking/visiting/chart")
  .get(authenticateToken, getChartDataByVisitingStatus);

router.route("/reports/weekly").get(authenticateToken, WeeklyDataAll);
router.route("/reports/monthly").get(authenticateToken, MonthlyDataAll);
router.route("/reports/yearly").get(authenticateToken, YearlyDataAll);

router.route("/reports/weekly/all").get(authenticateToken, WeeklyDataAllDoctor);
router
  .route("/reports/monthly/all")
  .get(authenticateToken, MonthlyDataAllDoctor);
router.route("/reports/yearly/all").get(authenticateToken, YearlyDataAllDoctor);

// router.route("/data/users", authenticateToken, async (req, res) => {
//   try {
//     const doctors = await Doctor.find();
//     res.status(200).json(doctors);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

module.exports = router;
