import React, { useRef } from 'react';
import { FaChevronUp } from "react-icons/fa";

const ChatForm = ({ generateBotResponse }) => {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";
    generateBotResponse(userMessage);
  };

  return (
    <div className="chatbot-footer">
      <form className="chat-form" onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Message..."
          className="message-input"
          required
          ref={inputRef}
        />
        <button type="submit">
          <FaChevronUp className="arrow-up-icon" />
        </button>
      </form>
    </div>
  );
};

export default ChatForm;
