// sockets/chat.js
import Message from '../models/Message.js'; // Create this model (see below)

const userSocketMap = {}; // userId -> socket.id

const chatSocketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    socket.on('joinRoom', ({ appointmentId, userId }) => {
      socket.join(appointmentId);
      userSocketMap[userId] = socket.id;
      console.log(`User ${userId} joined room ${appointmentId}`);
    });

    socket.on('sendMessage', async ({ appointmentId, sender, receiver, text }) => {
      const newMessage = new Message({
        appointmentId,
        sender,
        receiver,
        text,
      });

      await newMessage.save();

      io.to(appointmentId).emit('receiveMessage', newMessage);

      // Optional: notify the receiver directly
      const receiverSocket = userSocketMap[receiver];
      if (receiverSocket) {
        io.to(receiverSocket).emit('newMessageNotification', newMessage);
      }
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id);
      // Clean up userSocketMap if needed
    });
  });
};

export default chatSocketHandler;
