require("dotenv").config();
const Booking = require("../../models/Booking");
const Prescription = require("../../models/Prescription");
const moment = require("moment");

//Function to generate Prescription id
async function generatePrescriptionId() {
  // Find the last used prescription ID from the database
  const lastPrescription = await Prescription.findOne().sort({ pres_id: -1 });
  let nextPrescriptionId = 1;
  if (lastPrescription) {
    // Extract the number part of the last prescription ID
    const lastPrescriptionNumber = parseInt(
      lastPrescription.pres_id.split("-")[1]
    );
    if (!isNaN(lastPrescriptionNumber)) {
      nextPrescriptionId = lastPrescriptionNumber + 1;
    }
  }
  // Generate the next prescription ID
  return `PRESID-${nextPrescriptionId}`;
}

exports.savePrescription = async (req, res) => {
  try {
    const {
      pid,
      d_id,
      medications,
      expiresAt,
      bookingId,
      appointment_id,
      patient,
      doctor,
      amount,
    } = req.body;

    // Validate required fields
    if (
      !pid ||
      !d_id ||
      !medications ||
      !expiresAt ||
      !bookingId ||
      !appointment_id ||
      !patient ||
      !doctor ||
      !amount
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if the booking ID already exists
    const existingPrescription = await Prescription.findOne({
      appointment_id: appointment_id,
    });
    if (existingPrescription) {
      return res
        .status(400)
        .json({ error: "Prescription for this booking already exists" });
    }

    const prescription_id = await generatePrescriptionId();

    // Create a new prescription instance
    const prescription = new Prescription({
      patient,
      doctor,
      pres_id: prescription_id,
      pid,
      d_id,
      medications,
      expiresAt,
      booking: bookingId,
      appointment_id: appointment_id,
      amount,
      pay_status: "Not Paid",
    });

    // Save the prescription to the database
    await prescription.save();

    // Update visiting status to "Visited" for the associated booking
    await Booking.findByIdAndUpdate(bookingId, { visiting_status: "Visited" });

    // Respond with success message
    res
      .status(201)
      .json({ message: "Prescription created successfully", prescription });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllPrescription = async (req, res) => {
  try {
    const prescriptions = await Prescription.find()
      .populate({
        path: "booking",
        model: "Booking",
      })
      .populate({ path: "patient", model: "Patient" })
      .populate({ path: "doctor", model: "Doctor" });
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updatePrescription = async (req, res) => {
  try {
    const { medications, expiresAt } = req.body;

    // Find the prescription by ID and update it
    const prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      {
        medications,
        expiresAt,
      },
      { new: true }
    );

    if (!prescription) {
      return res.status(404).json({ error: "Prescription not found" });
    }

    res
      .status(200)
      .json({ message: "Prescription updated successfully", prescription });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllPrescriptionUsingPID = async (req, res) => {
  try {
    const { pid } = req.params;

    const prescription = await Prescription.find({ pid: pid })
      .populate({
        path: "booking",
        model: "Booking",
      })
      .populate({ path: "patient", model: "Patient" })
      .populate({ path: "doctor", model: "Doctor" });

    if (!prescription) {
      return res.status(404).json({ error: "Prescription not found" });
    }

    res.status(200).json(prescription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPrescriptionByPresID = async (req, res) => {
  try {
    const { pres_id } = req.params;

    const prescription = await Prescription.find({ pres_id: pres_id })
      .populate({
        path: "booking",
        model: "Booking",
      })
      .populate({ path: "patient", model: "Patient" })
      .populate({ path: "doctor", model: "Doctor" });

    if (!prescription) {
      return res.status(404).json({ error: "Prescription not found" });
    }

    res.status(200).json(prescription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllPRescriptionByDID = async (req, res) => {
  try {
    const { did } = req.params;

    const prescription = await Prescription.find({ d_id: did })
      .populate({
        path: "booking",
        model: "Booking",
      })
      .populate({ path: "patient", model: "Patient" })
      .populate({ path: "doctor", model: "Doctor" });

    if (!prescription) {
      return res.status(404).json({ error: "Prescription not found" });
    }

    res.status(200).json(prescription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPrescriptionChartByPID = async (req, res) => {
  try {
    const { pid } = req.params;

    const result = await Prescription.aggregate([
      {
        $match: { pid },
      },
      {
        $group: {
          _id: {
            month_year: {
              $dateToString: { format: "%Y-%m", date: "$createdAt" },
            },
            pid: "$pid",
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          label: "$_id.month_year",
          pid: "$_id.pid",
          data: "$count",
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getPrescriptionChartByDID = async (req, res) => {
  try {
    const { d_id } = req.params;

    const result = await Prescription.aggregate([
      {
        $match: { d_id },
      },
      {
        $group: {
          _id: {
            month_year: {
              $dateToString: { format: "%Y-%m", date: "$createdAt" },
            },
            d_id: "$d_id",
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          label: "$_id.month_year",
          d_id: "$_id.d_id",
          data: "$count",
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllPrescriptionChart = async (req, res) => {
  try {
    const result = await Prescription.aggregate([
      {
        $group: {
          _id: {
            month_year: {
              $dateToString: { format: "%Y-%m", date: "$createdAt" },
            },
            date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            d_id: "$d_id",
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          label: "$_id.month_year",
          date: "$_id.date",
          d_id: "$_id.d_id",
          data: "$count",
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: "Internal server error" });
  }
};
