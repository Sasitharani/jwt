import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatBot.css'; // Import the CSS file

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [document, setDocument] = useState(null);

  useEffect(() => {
    // Load the document content
    const fetchDocument = async () => {
      try {
        const response = await axios.get('/document.json'); // Corrected path
        console.log('Document fetched:', response.data); // Add this line
        setDocument(response.data);
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchDocument();
  }, []);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      // Simulate bot response
      setTimeout(() => {
        const botResponse = getBotResponse(input);
        setMessages(prevMessages => [...prevMessages, { text: botResponse, sender: 'bot' }]);
      }, 1000);
    }
  };

  const getBotResponse = (userInput) => {
    if (!document) {
      return 'Sorry, I cannot access the document right now.';
    }

    // Simple keyword matching for demonstration purposes
    const keyword = userInput.toLowerCase();
    const response = document[keyword] || 'Sorry, I do not understand your question.';
    return response;
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatBot;
