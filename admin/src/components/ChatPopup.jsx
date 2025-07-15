import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { X } from 'lucide-react';

const socket = io('http://localhost:4000'); // Replace with your backend URL in production

const AdminChatPopup = ({ appointmentId, userId, patientName = 'Patient', onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Join room when component mounts
    socket.emit('joinRoom', { appointmentId });

    // Listen for incoming messages
    socket.on('receiveMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Cleanup: leave room and remove listener
    return () => {
      socket.emit('leaveRoom', { appointmentId });
      socket.off('receiveMessage');
    };
  }, [appointmentId]);

  const sendMessage = () => {
    if (input.trim() === '') return;

    const messageData = {
      appointmentId,
      sender: userId,
      text: input.trim(), // Use 'text' to match patient and server
      timestamp: new Date().toISOString(),
    };

    socket.emit('sendMessage', messageData);
    setMessages((prev) => [...prev, messageData]);
    setInput('');
  };

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 w-80 h-96 bg-white shadow-xl rounded-xl border flex flex-col z-50">
      {/* Header */}
      <div className="bg-green-600 text-white px-4 py-2 rounded-t-xl font-bold flex justify-between items-center">
        <h3 className="text-sm font-semibold">Chat with {patientName}</h3>
        <button onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === userId ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-3 py-1 rounded-md ${
                msg.sender === userId
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-2 border-t flex gap-2">
        <input
          type="text"
          placeholder="Type your message"
          className="flex-1 border rounded px-2 py-1 text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-green-600 text-white px-3 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AdminChatPopup;
