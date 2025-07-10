import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

import './Chatbot.css';
import Chatimg from "../assets/img7.jpg";
import Botimg from "../assets/botimg.png";
import ChatForm from "./ChatForm.jsx";
import ChatMessage from "./ChatMessage.jsx";

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const chatBodyRef = useRef(null);

  const generateBotResponse = async (userMessage) => {
    // Add user message to chat history
    setChatHistory(prev => [...prev, { role: 'user', text: userMessage }]);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/chat`, { message: userMessage });



      setChatHistory(prev => [...prev, { role: 'bot', text: response.data.reply }]);

    } catch (error) {
      console.error(error);
      setChatHistory(prev => [...prev, { role: 'bot', text: "Error connecting to server" }]);
    }
  };

  // Auto scroll when chat updates
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <section>
      <img src={Chatimg} alt="" className="chat-background" />
      <div className="chatbot-container">
        <div className="chatbot-popup">
          <div className="chatbot-header">
            <div className="header-info">
              <div className="header-text">
                <img src={Botimg} alt="" />
                <h2 className="logo-text">Kisaan..</h2>
              </div>
            </div>

            <div className="chat-body" ref={chatBodyRef}>
              <div className="message chat-message">
                <p className="message-content">Welcome to Scarecrow Farms! How can I assist you today?</p>
              </div>

              {chatHistory.map((chat, index) => (
                <ChatMessage key={index} chat={chat} />
              ))}
            </div>

            <ChatForm generateBotResponse={generateBotResponse} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chatbot;
