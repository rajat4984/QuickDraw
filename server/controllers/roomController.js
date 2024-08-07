const {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} = require("unique-names-generator");
const Room = require("../models/Room");
const Participant = require("../models/Participant");

const createRoom = async (req, res) => {
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

    const newRoom = new Room({
      roomName,
      roomPassword,
      roomOwner: { ownerName: userName, ownerId: newParticipant._id },
      participantsArray: [newParticipant], // Add the new participant to the room
    });

    await newRoom.save();
    const roomData = newRoom.toObject();
    // delete roomData.roomPassword;

    res.status(200).json(roomData);
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

const leaveRoom = async (req, res) => {
  const { participantId, roomName } = req.body;
  // console.log(req.body)
  const room = await Room.findOne({ roomName });
  const newArr = room.participantsArray.filter((item) => {
    return item._id.toString() !== participantId;
  });

  room.participantsArray = newArr;
  await room.save();
  const roomData = room.toObject();
  delete roomData.roomPassword;

  return res.status(200).json(roomData);
};

const deleteRoom = async (req, res) => {
  try {
    const { roomName } = req.query;
    const room = await Room.findOneAndDelete({ roomName });
    if (!room) return res.status(404).json({ message: "Room not found" });
    return res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

const joinRoom = async (req, res) => {
  try {
    const { roomName, roomPassword, userName } = req.body;
    const room = await Room.findOne({ roomName });

    if (!room) return res.status(404).json({ message: "Room not found" });

    if (room.roomPassword !== roomPassword)
      return res.status(401).json({ message: "Wrong password" });

    // Create a new participant
    const newParticipant = new Participant({ userName });

    room.participantsArray.push(newParticipant);
    await room.save();
    const roomData = room.toObject();
    // delete roomData.roomPassword;

    return res.status(200).json(roomData);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};

const updateChat = async (req, res) => {
  try {
    const { roomName, message, senderId, senderName } = req.body;
    const room = await Room.findOne({ roomName });
    if (!room) return res.status(404).json({ message: "Room not found" });

    const messageObj = {
      message,
      senderId,
      senderName,
      timeStamp: new Date(),
    };

    room.chatRoomData.push(messageObj);

    room.save();

    return res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

const updateCanvas = async (req, res) => {
  const { canvasImg, roomName } = req.body;
  const room = await Room.findOne({ roomName });
  if (!room) return res.status(404).json({ message: "Room not found" });

  room.canvasImg = canvasImg;

  await room.save();

  res.status(200).json(room);
};

module.exports = {
  createRoom,
  deleteRoom,
  joinRoom,
  leaveRoom,
  updateChat,
  updateCanvas,
};
