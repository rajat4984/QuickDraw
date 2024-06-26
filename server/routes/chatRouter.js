const { createChat, updateChat, deleteChat, joinChat } = require("../controllers/chatController");

const router = require("express").Router();

router.post("/joinChat",joinChat);
router.post("/createChat",createChat);
router.put("/updateChat",updateChat);
router.delete('/deleteChat',deleteChat);    

module.exports = router;