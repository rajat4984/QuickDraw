const express = require("express");
const roomRouter = require("./routes/roomRouter");
const mongoose = require("mongoose");
const cors = require("cors");
const server = http.createServer(app);
const app = express();
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
  
});

app.use("/api/room", roomRouter);

mongoose.connect(process.env.MONGO_URI).then(() => {
  server.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });
});
