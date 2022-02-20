const express = require("express");
const { getHomePage, getWebhook, postWebhook } = require("../controllers/chatBotControllers");
const router = express.Router();

router.get('/', getHomePage);
router.get('/webhook', getWebhook);
router.post('/webhook', postWebhook);


module.exports = router;