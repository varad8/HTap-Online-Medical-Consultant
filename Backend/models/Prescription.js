const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema(
  {
    pres_id: { type: String, required: true, unique: true },
    pid: { type: String, required: true },
    d_id: { type: String, required: true },
    amount: { type: Number, required: true },
    appointment_id: { type: String, required: true },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    medications: [
      {
        name: { type: String, required: true },
        dosage: { type: String, required: true },
        frequency: { type: String, required: true },
        instructions: { type: String },
      },
    ],
    issuedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date },
    pay_status: { type: String, default: "Not Paid", required: true },
  },
  { timestamps: true }
);

const Prescription = mongoose.model("Prescription", prescriptionSchema);

module.exports = Prescription;
