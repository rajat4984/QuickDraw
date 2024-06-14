const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  roomName: {
    type: String,
    unique: true,
    require:true
  },
  roomPassword: {
    type: String,
    require:true
  },
  roomOwner: {
    type: String,
    require:true
  },
});

module.exports = mongoose.model("Room", RoomSchema);
