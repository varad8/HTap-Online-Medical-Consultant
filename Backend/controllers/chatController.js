const Message = require("../models/Message");
const ChatRoom = require("../models/ChatRoom");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");

// Get all messages for a specific chat room
exports.getAllMessages = async (req, res) => {
  try {
    const { chatRoomId } = req.params;
    if (!chatRoomId) {
      return res
        .status(400)
        .json({ error: "chatRoomId parameter is required" });
    }

    const messages = await Message.find({ chatRoomId })
      .populate({
        path: "patient",
        model: "Patient",
      })
      .populate({
        path: "doctor",
        model: "Doctor",
      });
    res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all chat rooms for a specific user
exports.getAllChatRooms = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: "userId parameter is required" });
    }

    console.log(userId);

    // Check if the userId corresponds to a patient (pid)
    let chatRooms = await ChatRoom.find({ uid: userId })
      .populate({
        path: "patient",
        model: "Patient",
      })
      .populate({
        path: "doctor",
        model: "Doctor",
      });

    // If no chat rooms found for the patient, check if it corresponds to a doctor (d_did)
    if (chatRooms.length === 0) {
      chatRooms = await ChatRoom.find({ did: userId })
        .populate({
          path: "patient",
          model: "Patient",
        })
        .populate({
          path: "doctor",
          model: "Doctor",
        });
    }

    res.json(chatRooms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Create a new message
exports.createMessage = async (req, res) => {
  try {
    const { senderId, receiverId, text } = req.body;

    // Determine senderId and receiverId
    let userId, docId;
    if (senderId.startsWith("user")) {
      userId = senderId;
      docId = receiverId;
    } else {
      userId = receiverId;
      docId = senderId;
    }

    // Determine chat room ID
    const chatRoomId = `${userId}_${docId}`;

    // Find or create the chat room
    let chatRoom = await ChatRoom.findOneAndUpdate(
      { chatRoomId },
      {
        userId,
        docId,
        chatRoomId,
        lastMessage: text,
        lastMessageTime: new Date(),
      },
      { upsert: true, new: true }
    );

    // Find the existing message for the chat room
    let existingMessage = await Message.findOne({ chatRoomId });

    if (existingMessage) {
      // If message already exists, update it
      existingMessage.messages.push({
        senderId,
        receiverId,
        text,
      });
      existingMessage.lastMessage = text;
      existingMessage.lastMessageTime = new Date();
      await existingMessage.save();
    } else {
      // If no message exists, create a new one
      const newMessage = new Message({
        patient: chatRoom.patient,
        doctor: chatRoom.doctor,
        userId,
        docId,
        chatRoomId,
        lastMessage: text,
        lastMessageTime: new Date(),
        messages: [
          {
            senderId,
            receiverId,
            text,
          },
        ],
      });
      await newMessage.save();
    }

    res.json({
      message: "Message created/updated successfully",
      data: { senderId, receiverId, text },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Create a new chat room
exports.createChatRoom = async (req, res) => {
  try {
    const { userId, docId, patient, doctor, uid, did } = req.body;
    const roomId = `${userId}_${docId}`;
    let chatRoom = await ChatRoom.findOne({ userId, docId });
    if (!chatRoom) {
      chatRoom = new ChatRoom({
        userId,
        docId,
        chatRoomId: roomId,
        patient,
        doctor,
        uid,
        did,
      });
      await chatRoom.save();
    }
    res.json(chatRoom);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getProfilePicByPid = async (req, res) => {
  const { pid } = req.params;

  try {
    const profile = await Patient.findOne(
      { pid },
      { p_profile_pic: 1, _id: 0 }
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    return res.status(200).json({ p_profile_pic: profile.p_profile_pic });
  } catch (error) {
    console.error("Error fetching patient profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getProfilePicByDid = async (req, res) => {
  const { did } = req.params;

  try {
    const profile = await Doctor.findOne(
      { d_id: did },
      { d_profile_pic: 1, _id: 0 }
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    return res.status(200).json({ d_profile_pic: profile.d_profile_pic });
  } catch (error) {
    console.error("Error fetching patient profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
