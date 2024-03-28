const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    notification_title: { type: String, required: true },
    feedback_message: { type: String, required: true },
    ratings: { type: Number, required: true },
    pid: { type: String, required: true },
    d_id: { type: String, required: true },
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
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
