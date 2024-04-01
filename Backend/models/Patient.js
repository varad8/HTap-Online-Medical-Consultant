const mongoose = require("mongoose");

const patinetProfileSchema = new mongoose.Schema(
  {
    pid: { type: String, required: true, unique: true },
    p_username: { type: String, required: true },
    p_add: { type: String, required: true },
    p_firstname: { type: String, required: true },
    p_lastname: { type: String, required: true },
    p_contact: { type: String, required: true },
    p_email: { type: String, required: true },
    p_profile_pic: { type: String, required: true },
    p_location: {
      city: { type: String },
      state: { type: String },
    },
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patinetProfileSchema);

module.exports = Patient;
