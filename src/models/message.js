const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.String, ref: 'user', required: true },
  messageId: { type: String, required: true },
  message: { type: String, required: true },
});

module.exports = mongoose.model("message", messageSchema);