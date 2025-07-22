import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000'); // Update if needed

const ChatPopup = ({ onClose, appointmentId, userId, doctorId, doctorName, patientUserId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const chatBoxRef = useRef();

  // Load message history
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/messages/${appointmentId}`);
        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    };

    fetchMessages();

    socket.emit('joinRoom', { appointmentId });

    socket.on('receiveMessage', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.emit('leaveRoom', { appointmentId });
      socket.off('receiveMessage');
    };
  }, [appointmentId]);

  useEffect(() => {
    chatBoxRef.current?.scrollTo(0, chatBoxRef.current.scrollHeight);
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      const msg = {
        appointmentId,
        sender: userId,
        receiver: userId === doctorId ? doctorId : doctorId, // receiver logic
        text: message,
        timestamp: new Date().toISOString(),
      };

      socket.emit('sendMessage', msg);
      setMessage(''); // Just clear input
    }
  };


  return (
    <div className="fixed bottom-4 right-4 w-80 h-96 bg-white shadow-xl rounded-xl border flex flex-col z-50">
      <div className="bg-green-600 text-white px-4 py-2 rounded-t-xl font-bold flex justify-between">
        <span>Chat with {doctorName}</span>
        <button onClick={onClose}>✖</button>
      </div>
      <div ref={chatBoxRef} className="flex-1 p-3 overflow-y-auto bg-gray-100">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 flex ${msg.sender === userId ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-3 py-2 rounded-lg max-w-[70%] ${msg.sender === userId
                  ? 'bg-green-500 text-white'
                  : 'bg-white border text-black'
                }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-2 border-t flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-1 border rounded px-2 py-1 text-sm"
          placeholder="Type a message..."
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

export default ChatPopup;
