const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  docId: { type: String, required: true },
  chatRoomId: { type: String, required: true, unique: true },
  lastMessage: { type: String },
  lastMessageTime: { type: Date },
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
  messages: [
    {
      senderId: { type: String, required: true },
      receiverId: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
      text: { type: String, required: true },
    },
  ],
});

// Remove the unique index on the lastMessage field
messageSchema.index({ lastMessage: 1 }, { unique: false });

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
