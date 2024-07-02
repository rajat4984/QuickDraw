const { createRoom, deleteRoom, joinRoom, leaveRoom, updateChat, updateCanvas } = require("../controllers/roomController");

const router = require("express").Router();

router.post("/createRoom", createRoom);
router.delete("/deleteRoom", deleteRoom);
router.post("/joinRoom", joinRoom);
router.post('/leaveRoom',leaveRoom)
router.post("/updateChat",updateChat);  
router.post("/updateCanvas",updateCanvas);  

module.exports = router;
