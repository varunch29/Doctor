// models/Message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  appointmentId: String,
  sender: String,
  receiver: String,
  text: String,
  timestamp: { type: Date, default: Date.now },
  seen: { type: Boolean, default: false },
});

module.exports = mongoose.model('Message', messageSchema);
