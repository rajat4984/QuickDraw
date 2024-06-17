const mongoose = require("mongoose");

const ChatRoomSchema = new mongoose.Schema({
  participants: {
    type: Array,
    required: true,
  },
  roomOwner: {
    type: String,
    required: true,
  },
  roomName: {
    type: String,
    required: true,
  },
  chatRoomData: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Chat", ChatRoomSchema);
