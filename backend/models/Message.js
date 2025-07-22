import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  appointmentId: { type: String, required: true },
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Message', messageSchema);
