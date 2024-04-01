const mongoose = require("mongoose");

const adminProfileSchema = new mongoose.Schema(
  {
    aid: { type: String, required: true, unique: true },
    a_username: { type: String, required: true },
    a_firstname: { type: String, required: true },
    a_lastname: { type: String, required: true },
    a_address: { type: String, required: true },
    a_email: { type: String, required: true },
    a_contact: { type: String, required: true },
    a_profile_pic: { type: String, required: true },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminProfileSchema);

module.exports = Admin;
