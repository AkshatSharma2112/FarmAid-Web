import React from 'react';

const ChatMessage = ({ chat }) => {
  return (
    <div className={`message ${chat.role === 'bot' ? 'chat-message' : 'user-message'}`}>
      <p className="message-content">{chat.text}</p>
    </div>
  );
};

export default ChatMessage;
