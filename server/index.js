const express = require("express");
const roomRouter = require("./routes/roomRouter");
const chatRouter = require("./routes/chatRouter");
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const PORT = 5000;

const { Server } = require("socket.io");

require("dotenv").config();
app.use(express.json());
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*", // Adjust this as needed for your frontend
  },
});

io.on("connection", (socket) => {
  console.log(`${socket.id} is connected `);

  socket.on("leaveRoom", (updatedRoomData) => {
    console.log(updatedRoomData,'leaveRoom');
    socket.broadcast.emit("updateParticipants", updatedRoomData);
  });

  socket.on("deleteRoom", () => {
    console.log("socketdelete");
    socket.broadcast.emit("kickOut");
  });

  socket.on("participantJoined",(updatedRoomData)=>{
    socket.broadcast.emit("notifyParticipantJoined",updatedRoomData)
  })

  socket.on("disconnect", () => {
    console.log("User disconnected");
    // console.log(`${socket.id} discconected`);
  });
});

app.use("/api/room", roomRouter);
app.use("/api/chat", chatRouter);

mongoose.connect(process.env.MONGO_URI).then(() => {
  server.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });
});
