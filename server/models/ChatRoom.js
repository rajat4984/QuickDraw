const mongoose = require("mongoose");

const ChatRoomSchema = new mongoose.Schema({
  participants: {
    type: Array,
    required: true,
  },
  roomName: {
    type: String,
    required: true,
  },
  chatRoom: {
    type: Object,
    required: true,
  },
});


module.exports = mongoose.model("Chat",ChatRoomSchema);
