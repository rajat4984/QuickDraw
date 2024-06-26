const { createRoom, deleteRoom, joinRoom, leaveRoom, updateChat } = require("../controllers/roomController");

const router = require("express").Router();

router.post("/createRoom", createRoom);
router.delete("/deleteRoom", deleteRoom);
router.post("/joinRoom", joinRoom);
router.post('/leaveRoom',leaveRoom)
router.post("/updateChat",updateChat);

module.exports = router;
