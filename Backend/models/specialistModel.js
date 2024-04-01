const mongoose = require("mongoose");

const specialistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

const Specialist = mongoose.model("Specialist", specialistSchema);

module.exports = Specialist;
