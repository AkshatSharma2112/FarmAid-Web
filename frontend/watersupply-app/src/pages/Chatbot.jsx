import React from "react";
import Chatboticon from "../component/Chatboticon";
import { FaChevronDown } from "react-icons/fa"; // install react-icons if not already

const Chatbot = () => {
  return (
    <div className="chatbot-container">
      <div className="chatbot-popup">
        <div className="chatbot-header">
          <div className="header-info">
            <Chatboticon />
            <div className="header-text">
              <h2 className="logo-text">Kishaan</h2>
            </div>
            <button><FaChevronDown className="arrow-down-icon" /></button>
          </div>
          {/* Chatbot Header */}
          <div className="chat-body">
            <div className="chat-message">
              <div className="message-content">
                <p>Welcome to Kishaan! How can I assist you today?</p>
              </div>
              <div className="user-message">
                <p className="message-content">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
            </div>
            {/* Chatbot Footer */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
