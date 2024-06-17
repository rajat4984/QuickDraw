const ChatRoom = require("../models/ChatRoom");

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

const deleteChat = (req, res) => {
  console.log("Delete chat");
};

const getChat = (req, res) => {
  console.log("Get chat");
};

const updateChat = (req, res) => {
  console.log("Updated chat");
};

module.exports = { createChat, deleteChat, getChat, updateChat };
