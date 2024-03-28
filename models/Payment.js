const { Double, Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    pay_id: { type: String, required: true, unique: true },
    pid: { type: String, required: true },
    d_id: { type: String, required: true },
    pres_id: { type: String, required: true },
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
    prescription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prescription",
      required: true,
    },
    payDate: { type: String, required: true },
    pay_status: { type: String, default: "Not Paid" },
    pay_amount: { type: Number, required: true },
    pay_type: { type: String, required: true },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
