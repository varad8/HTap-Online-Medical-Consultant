const Doctor = require("../../models/Doctor");
const Specialist = require("../../models/specialistModel");
const moment = require("moment");

// Route handler to get Doctor all
exports.getAllDoctors = async (req, res) => {
  try {
    // Fetch all doctors from the database
    const doctors = await Doctor.find();

    // Convert timestamps to readable format
    const formattedDoctors = doctors.map((doctor) => ({
      ...doctor.toObject(),
      createdAt: moment(doctor.createdAt).format("DD/MM/YYYY HH:mm:ss"),
    }));

    // Respond with the list of doctors
    res.status(200).json(formattedDoctors);
  } catch (error) {
    // Handle errors
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Route handler to get doctors based on location and approved account status
exports.getDoctorsByLocationAndStatus = async (req, res) => {
  try {
    const { city, state, occupation } = req.query;

    // Validate that city and state are provided
    if (!city || !state || !occupation) {
      return res.status(400).json({
        error: "City and state and specailist dr are required parameters",
      });
    }

    // Fetch doctors based on location and approved account status
    const doctors = await Doctor.find({
      "d_location.city": city,
      "d_location.state": state,
      account_status: "APPROVED",
      occupation: occupation,
    });

    // Respond with the list of approved doctors in the specified location
    res.status(200).json(doctors);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: "Internal server error" });
  }
};

// Route handler to get a doctor details by ObjectId
exports.getDoctorById = async (req, res) => {
  try {
    const { doctorId } = req.params;

    // Validate that doctorId is provided
    if (!doctorId) {
      return res.status(400).json({ error: "DoctorId parameter is required" });
    }

    // Fetch the doctor by ObjectId
    const doctor = await Doctor.findById(doctorId);

    // If the doctor is not found, return a 404 error
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    // Respond with the doctor details
    res.status(200).json(doctor);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateDoctorAccountStatus = async (req, res) => {
  try {
    const { doctorId } = req.params;

    console.log("IM CALL");

    if (!doctorId) {
      return res.status(400).json({ error: "DoctorId parameter is required" });
    }

    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    doctor.account_status =
      doctor.account_status === "APPROVED" ? "NOT APPROVED" : "APPROVED";

    await doctor.save();

    res.status(200).json({ message: "Account status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//Get Specailist
exports.getSpecailistList = async (req, res) => {
  try {
    // Find the specialist by ID
    const specialist = await Specialist.find();

    res.status(200).json(specialist);
  } catch (error) {
    console.error("Error updating specialist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
