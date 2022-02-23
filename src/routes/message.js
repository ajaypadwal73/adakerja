const express = require("express");
const { getMessageFromDBById, getAllMessagesFromDB, getMessageSummary } = require("../controllers/message");
const router = express.Router();

router.get("/messages", getAllMessagesFromDB);

router.get("/message/:id", getMessageFromDBById);

router.get("/summary", getMessageSummary);


module.exports = router;