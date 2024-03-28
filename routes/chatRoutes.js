const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const { authenticateToken } = require("../middlewares/authentication");

// Route for getting all messages
router.get(
  "/messages/:chatRoomId",
  authenticateToken,
  chatController.getAllMessages
);

// Route for creating a new message
router.post("/messages", authenticateToken, chatController.createMessage);

// Route for getting all chat rooms
router.get("/chatrooms", authenticateToken, chatController.getAllChatRooms);

// Route for creating a new chat room
router.post("/chatrooms", authenticateToken, chatController.createChatRoom);

// Route for getting profile pic
router.get(
  "/chatrooms/user/profile/:pid",
  authenticateToken,
  chatController.getProfilePicByPid
);

router.get(
  "/chatrooms/doctor/profile/:did",
  authenticateToken,
  chatController.getProfilePicByDid
);

module.exports = router;
