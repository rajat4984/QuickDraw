const mongoose = require("mongoose");
const participantSchema = require("./Participant").schema;

const RoomSchema = new mongoose.Schema({
  roomName: {
    type: String,
    unique: true,
    required: true,
  },
  participantsArray: {
    type: [participantSchema],
    default: [],
  },
  chatRoomData: {
    type: Array,
    default: [],
  },
  roomPassword: {
    type: String,
    required: true,
  },
  roomOwner: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model("Room", RoomSchema);
