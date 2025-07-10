// Hero.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';
import Chatbot from './Chatbot.jsx'; 

const Hero = () => {
  const navigate = useNavigate();

  const handleAskQuestion = () => {
    navigate('/chatbot');
  };

  return (
    <div>
      <section className="hero-section">
        <div className="hero-content">
          <img src="" alt="" />
          <h1 className="hero-title">
            Empowering Farmers with
            Smart, Sustainable Solutions
          </h1>
          <p className="hero-subtext">
            Get expert advice, modern techniques, and the latest tools to boost your farm’s productivity.
          </p>
          <div className="hero-buttons">
            <button className="btn primary">Get Started</button>
            <button className="btn secondary" onClick={handleAskQuestion}>
              Ask a Question
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
