const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  psid: { type: Number, required: true, unique: true },
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
});

module.exports = mongoose.model("user", userSchema);