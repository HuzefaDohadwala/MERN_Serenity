const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomname: {
    type: String,
    required: true,
  },
  member: {
    type: String,
    required: true,
  },
  listener: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Room", roomSchema);
