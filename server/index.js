const express = require("express");
const roomRouter = require("./routes/roomRouter");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000;

require("dotenv").config();
app.use(express.json());

app.use("/api/room", roomRouter);

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });
});
