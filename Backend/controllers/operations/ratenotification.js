const Notification = require("../../models/Notification");

// Save a new notification or prompt to update existing
exports.saveNotification = async (req, res) => {
  try {
    const {
      notification_title,
      feedback_message,
      ratings,
      pid,
      d_id,
      patient,
      doctor,
    } = req.body;

    if (
      !notification_title ||
      !feedback_message ||
      !ratings ||
      !pid ||
      !d_id ||
      !patient ||
      !doctor
    ) {
      return res.status(400).json({ error: "Data cant be empty" });
    }

    // Check if a notification already exists for the patient and doctor
    const existingNotification = await Notification.findOne({ pid, d_id });
    if (existingNotification) {
      return res.status(409).json({
        error:
          "You've already rated this doctor. Please update it from the Notification panel.",
      });
    }

    // Create a new notification object
    const newNotification = new Notification({
      notification_title,
      feedback_message,
      ratings,
      pid,
      d_id,
      patient,
      doctor,
    });

    // Save the notification to the database
    await newNotification.save();

    // Respond with the saved notification
    res.status(201).json({ message: "Thanks for rating" });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a notification by ID
exports.updateNotificationById = async (req, res) => {
  try {
    const { id } = req.params;
    const { notification_title, feedback_message, ratings } = req.body;

    if (!notification_title || !feedback_message || !ratings) {
      return res.status(404).json({ error: "Fields cant be blank" });
    }

    const updatedNotification = await Notification.findByIdAndUpdate(
      id,
      { notification_title, feedback_message, ratings },
      { new: true }
    );
    if (!updatedNotification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json({ message: "Rating Updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a notification by ID
exports.deleteNotificationById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNotification = await Notification.findByIdAndDelete(id);
    if (!deletedNotification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get notification ID
exports.getNotificationId = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findById(id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getNotificationByPID = async (req, res) => {
  try {
    const { pid } = req.params;

    const notification = await Notification.find({ pid })
      .populate({ path: "patient", model: "Patient" })
      .populate({ path: "doctor", model: "Doctor" });
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getNotificationByDID = async (req, res) => {
  try {
    const { d_id } = req.params;

    const notification = await Notification.find({ d_id })
      .populate({ path: "patient", model: "Patient" })
      .populate({ path: "doctor", model: "Doctor" });
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllNotification = async (req, res) => {
  try {
    const notification = await Notification.find()
      .populate({ path: "patient", model: "Patient" })
      .populate({ path: "doctor", model: "Doctor" });
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
