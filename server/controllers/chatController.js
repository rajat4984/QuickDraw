const ChatRoom = require("../models/ChatRoom");
const Room = require("../models/Room");

const createChat = async (req, res) => {
  try {
    const { roomOwner, roomName } = req.body;
    const newChat = new ChatRoom({
      participants: [roomOwner],
      roomOwner,
      roomName,
      chatRoomData: [],
    });

    await newChat.save();
    res.status(200).json(newChat);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};

const joinChat = async (req, res) => {
  const { roomName, currentUser } = req.body;
  const room = await Room.findOne({ roomName });
  res.send(room)
};

const leaveChat = async (req, res) => {
  const { roomName, currentUser } = req.body;

  const chatRoom = await ChatRoom.findOne({ roomName });
  const newChatRoom = chatRoom.participants.filter(()=>{

  })
};

const deleteChat = (req, res) => {
  console.log("Delete chat");
};

const updateChat = (req, res) => {
  
};

module.exports = { createChat, deleteChat, joinChat, updateChat };
