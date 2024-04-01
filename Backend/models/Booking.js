const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
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
    appointment_id: { type: String, required: true, unique: true },
    patient_problem: { type: String, required: true },
    visiting_status: { type: String, required: true, default: "Not Visited" },
    booking_status: { type: String, required: true, default: "Booked" },
    visiting_timestamp: { type: Date },
    pid: { type: String, required: true },
    d_id: { type: String, required: true },
    scheduletime: { type: Date, required: true },
    patientMobileNo: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid 10-digit phone number!`,
      },
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
