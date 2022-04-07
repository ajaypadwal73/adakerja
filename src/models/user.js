const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  psid: { type: String, required: true, unique: true },
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
}, { timestamps: true });

module.exports = mongoose.model("user", userSchema);