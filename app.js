const express = require("express");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

const connectToDatabase = require("./database/Connection");
const userRoutes = require("./routes/userRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const adminRoutes = require("./routes/adminRoutes");
const socketIo = require("socket.io");
const chatRoutes = require("./routes/chatRoutes");
const http = require("http");

const app = express();
const ejs = require("ejs");
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Set EJS as the view engine
app.set("view engine", "ejs");

// Set the directory where your views are located (optional, default is 'views')
app.set("views", __dirname + "/views");

// User Routes
app.use("/api", userRoutes);

//Doctor Routes
app.use("/api", doctorRoutes);

//Admin Routes
app.use("/api", adminRoutes);

// Routes for chat-related operations
app.use("/api", chatRoutes);

// Define the route to return JSON data
app.get("/api/cities", (req, res) => {
  // Read the JSON file
  fs.readFile("./city.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    // Parse the JSON data
    const cities = JSON.parse(data);
    // Return the JSON data
    res.json(cities);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
