const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  roomName: {
    type: String,
    unique: true,
  },
  roomPassword: {
    type: String,
  },
  roomOwner: {
    type: String,
  },
});

module.exports = mongoose.model("Room", RoomSchema);
