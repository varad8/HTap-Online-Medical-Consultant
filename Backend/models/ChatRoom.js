const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  docId: { type: String, required: true },
  chatRoomId: { type: String, required: true, unique: true },
  lastMessage: { type: String },
  lastMessageTime: { type: Date },
  createdAt: { type: Date, default: Date.now },
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
  uid: { type: String, required: true },
  did: { type: String, required: true },
});

const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);

module.exports = ChatRoom;
