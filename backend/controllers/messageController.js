// controllers/messageController.js
import Message from '../models/Message.js';

// Get messages by appointment ID
export const getMessages = async (req, res) => {
  const { appointmentId } = req.params;

  try {
    const messages = await Message.find({ appointmentId }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

// Save new message
export const saveMessage = async (req, res) => {
  const { appointmentId, sender, receiver, text } = req.body;

  try {
    const message = new Message({
      appointmentId,
      sender,
      receiver,
      text
    });

    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save message' });
  }
};
