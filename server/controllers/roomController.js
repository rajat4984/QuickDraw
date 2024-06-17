const {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} = require("unique-names-generator");
const Room = require("../models/Room");
const Participant = require("../models/Participant");

const createRoom = async (req, res) => {
  console.log(req.body.userName);
  try {
    const userName = req.body.userName;
    let roomName = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
    });
    let roomPassword = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
    });
    roomName = roomName + "_" + new Date().getTime();

    // Create a new participant
    const newParticipant = new Participant({ userName });
    console.log(newParticipant, "newParticipant");

    const newRoom = new Room({
      roomName,
      roomPassword,
      roomOwner: { ownerName: userName, ownerId: newParticipant._id },
      participantsArray: [newParticipant], // Add the new participant to the room
    });

    await newRoom.save();

    res.status(200).json(newRoom);
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const { roomName } = req.body;

    const room = await Room.findOneAndDelete({ roomName });
    if (!room) return res.status(404).json({ message: "Room not found" });

    return res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

const joinRoom = async (req, res) => {
  console.log(req.body);
  try {
    const { roomName, roomPassword,userName } = req.body;
    const room = await Room.findOne({ roomName });

    if (!room) return res.status(404).json({ message: "Room not found" });

    if (room.roomPassword !== roomPassword)
      return res.status(401).json({ message: "Wrong password" });

     // Create a new participant
     const newParticipant = new Participant({ userName });
     console.log(newParticipant, "newParticipant");

     room.participantsArray.push(newParticipant);
     await room.save();

    return res.status(200).json({ message: "Room joined", room });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};

module.exports = { createRoom, deleteRoom, joinRoom };
