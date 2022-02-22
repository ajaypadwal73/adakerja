const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  messageId: { type: String, required: true },
  message: { type: String, required: true },
});

module.exports = mongoose.model("message", messageSchema);