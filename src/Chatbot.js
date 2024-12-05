import React, { useState } from "react";
import axios from "axios";
import "./Style.css";
import chatbotpic from './images/chatbotpic.png';
import chatbotlogo from './images/chatbotlogo.jpg';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [error, setError] = useState(null);
  const [isTyping, setIsTyping] = useState(false); // New state for typing indicator

  const sendMessage = async () => {
    if (!userMessage.trim()) return;

    const updatedMessages = [...messages, { sender: "user", text: userMessage }];
    setMessages(updatedMessages);
    setUserMessage("");
    setError(null);

    setIsTyping(true); // Show typing indicator

    try {
      const response = await axios.post("http://localhost:7000/api/chat", {
        userMessage,
        chatHistory: updatedMessages,
      });

      const botReply = { sender: "bot", text: response.data.reply };
      setMessages((prevMessages) => [...prevMessages, botReply]);
    } catch (error) {
      console.error("Error fetching response:", error);
      const errorMessage =
        error.response?.status === 429
          ? "Quota exceeded. Please try again later."
          : "Something went wrong. Please try again.";

      setError(errorMessage);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: errorMessage },
      ]);
    } finally {
      setIsTyping(false); // Hide typing indicator
    }
  };

  return (
    <div className="chatbot-page">
      <header className="chatbot-header">
        
      <div className="logo">
      <img src={chatbotpic} alt="Chatbot Logo" /></div>
      <div>
        <h1>ChatBot Assistant</h1>
        <p>Your friendly AI-powered assistant, here to help 24/7.</p> </div> 
      </header>
      <div className="content-container">
        <section className="body-content">
          <h2>About ChatBot</h2>
          <p>
            Our chatbot is designed to assist users in getting instant answers
            and solutions. Powered by state-of-the-art AI, it can handle various
            tasks such as answering queries, guiding through processes, and
            offering information.
          </p>
          <h2>How to Use the ChatBot</h2>
          <ol>
            <li>Type your question or request in the input box.</li>
            <li>Click the "Send" button to submit your message.</li>
            <li>Wait for the ChatBot to respond with helpful information.</li>
          </ol>
          <div class="image"><img src={chatbotlogo} alt="about-pic"/></div>
        </section>
        <div className="chatbot">
          <div className="chat-window">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${
                  msg.sender === "user" ? "user" : "bot"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="chat-message bot typing-indicator">
                Bot is typing...
              </div>
            )}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
