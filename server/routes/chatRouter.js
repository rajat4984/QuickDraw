const { getChat, createChat, updateChat, deleteChat } = require("../controllers/chatController");

const router = require("express").Router();

router.get("/getChat",getChat);
router.post("/createChat",createChat);
router.put("/updateChat",updateChat);
router.delete('/deleteChat',deleteChat);    

module.exports = router;