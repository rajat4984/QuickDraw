const { createRoom, deleteRoom, joinRoom, leaveRoom } = require("../controllers/roomController");

const router = require("express").Router();

router.post("/createRoom", createRoom);
router.delete("/deleteRoom", deleteRoom);
router.post("/joinRoom", joinRoom);
router.post('/leaveRoom',leaveRoom)

module.exports = router;
