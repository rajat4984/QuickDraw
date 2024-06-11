const { createRoom, deleteRoom, joinRoom } = require("../controllers/roomController");

const router = require("express").Router();

router.post("/createRoom", createRoom);
router.delete("/deleteRoom", deleteRoom);
router.post("/joinRoom", joinRoom);

module.exports = router;
