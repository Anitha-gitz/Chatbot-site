import React from 'react';
import './Header.css'; // Optional: Add styles for the header
import chatbotpic from './images/chatbotpic.png';

const Header = () => {
  return (
    <header className="chatbot-header">
      <nav className="navbar">
        <div className="logo">
          <img src={chatbotpic} alt="Chatbot Logo" />
          <h1>Chatbot Assistant</h1>
        </div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
