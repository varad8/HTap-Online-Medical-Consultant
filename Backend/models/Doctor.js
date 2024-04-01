const mongoose = require("mongoose");

const doctorProfileSchema = new mongoose.Schema(
  {
    d_id: { type: String, required: true, unique: true },
    d_username: { type: String, required: true },
    d_address: { type: String, required: true },
    d_firstname: { type: String, required: true },
    d_lastname: { type: String, required: true },
    d_contact: { type: String, required: true },
    d_email: { type: String, required: true },
    d_profile_pic: { type: String, required: true },
    d_exp: { type: Number, required: true },
    d_location: {
      city: { type: String },
      state: { type: String },
    },
    occupation: { type: String, required: true },
    account_status: { type: String, default: "NOT APPROVED" },
    servicehours: {
      monday: { type: String, default: "Closed" },
      tuesday: { type: String, default: "Closed" },
      wednesday: { type: String, default: "Closed" },
      thursday: { type: String, default: "Closed" },
      friday: { type: String, default: "Closed" },
      saturday: { type: String, default: "Closed" },
      sunday: { type: String, default: "Closed" },
    },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorProfileSchema);

module.exports = Doctor;
