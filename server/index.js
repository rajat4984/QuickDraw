const express = require("express");
const roomRouter = require("./routes/roomRouter");
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const PORT = 5000;

const { Server } = require("socket.io");

require("dotenv").config();
app.use(express.json({ limit: "50mb" })); // Adjust the limit as needed
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*", // Adjust this as needed for your frontend
  },
});

io.on("connection", (socket) => {
  // console.log(`${socket.id} is connected `);

  socket.on("leaveRoom", (updatedRoomData) => {
    socket.broadcast.emit("updateParticipants", updatedRoomData);
  });

  socket.on("broadCast", (data) => {
    socket.broadcast.emit(data.emitName, {
      id: socket.id,
      payload: data,
    });
  });

  socket.on("deleteRoom", () => {
    socket.broadcast.emit("kickOut");
  });

  socket.on("disconnect", () => {});
});

app.use("/api/room", roomRouter);

mongoose.connect(process.env.MONGO_URI).then(() => {
  server.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });
});
