const mongoose = require("mongoose");

const ChatRoomSchema = new mongoose.Schema({
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
