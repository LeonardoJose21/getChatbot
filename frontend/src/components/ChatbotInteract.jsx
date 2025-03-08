import React, { useState } from 'react';
import { interactWithChatbot } from '../api/chatbot';

const ChatbotInteract = ({ context, modelUrl }) => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSendMessage = async () => {
    try {
      const response = await interactWithChatbot("leo", message);
      setResponse(response.reply);
    } catch (error) {
      console.error('Error interacting with chatbot:', error);
    }
  };

  return (
    <div className='p-6'>
      <input
        type="text"
        className='text-bg p-2 rounded'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button className='p-2 ml-4 rounded bg-btn' onClick={handleSendMessage}>Send</button>
      <p className='mt-3'>Chatbot Response: {response}</p>
    </div>
  );
};

export default ChatbotInteract;

