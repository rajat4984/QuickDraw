const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  socketId: {
    type: String,
  },
});

const Participant = mongoose.model("Participant", participantSchema);
module.exports = Participant;
