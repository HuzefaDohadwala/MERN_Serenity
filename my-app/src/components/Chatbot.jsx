import React, { useState } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);

  const handleUserMessage = (text) => {
    setMessages((prevMessages) => [...prevMessages, { text, isUser: true }]);
    respondToUser(text);
  };

  const respondToUser = (userText) => {
    const intents = [
      {
        tag: "greetings",
        patterns: [
          "Hi",
          "Hello",
          "Hi there",
          "Hey",
          "Greetings",
          "Good day",
          "Welcome",
          "Nice to meet you",
          "Howdy",
          "Salutations",
          "Yo",
        ],
        responses: [
          "Hello there!",
          "Hi! How can I help you today?",
          "Greetings! What can I assist you with?",
          "Hey! What brings you here?",
          "Welcome! How may I be of service to you?",
          "Good day! How can I assist you?",
          "Hello, how can I help you today?",
          "Hi there, what can I do for you?",
          "Greetings and welcome! How may I assist you?",
          "Hey, what can I help you with today?",
        ],
      },
      {
        tag: "anxiety",
        patterns: [
          "I'm feeling anxious right now",
          "I'm struggling with anxiety",
          "Anxiety is overwhelming me",
          "I'm feeling nervous and uneasy",
          "I'm experiencing high levels of anxiety",
          "My anxiety is really bad today",
          "I'm feeling anxious and stressed",
          "Anxiety is taking over me",
          "I'm having an anxiety attack",
          "I'm feeling on edge and anxious",
        ],
        responses: [
          "I'm truly sorry to hear that you're feeling this way. Our platform has trained listeners who are here to help you.",
          "I'm here for you. We have dedicated listeners on our platform who can provide support during this time.",
          "I'm really sorry to hear that. We have caring listeners on our platform who are ready to assist you.",
          "I'm here to help. Our platform has understanding listeners who can offer support.",
          "I'm sorry you're going through this. We have compassionate listeners available to talk with you.",
          "I'm here to listen. Our platform has empathetic listeners who can provide a listening ear.",
          "I'm genuinely sorry to hear that. Our platform is here for you with compassionate listeners.",
          "I'm here for you. We have trained listeners on our platform who are ready to lend an ear.",
          "I'm really sorry to hear that you're feeling this way. Our platform has caring listeners who can offer support.",
          "I'm here to listen and support you. Our platform has dedicated listeners who can provide assistance.",
        ],
      },
      {
        tag: "website_start",
        patterns: [
          "How do I start on the website?",
          "Getting started on the website",
          "How to begin on the website?",
        ],
        responses: [
          "To get started on the website, follow these steps:\n1. Signup and create an account as a member.\n2. Log in using your credentials.\n3. Send a request to a listener you'd like to talk to.\n4. Once accepted, start your conversation with them.",
        ],
      },
    ];

    for (const intent of intents) {
      for (const pattern of intent.patterns) {
        const regex = new RegExp(pattern, "i");
        if (regex.test(userText)) {
          const randomResponse =
            intent.responses[
              Math.floor(Math.random() * intent.responses.length)
            ];
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: randomResponse, isUser: false },
          ]);
          return;
        }
      }
    }
  };

  return (
    <div className="cb_container">
      <div className="chatbot-container">
        <div className="chatbot-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={message.isUser ? "user-message" : "bot-message"}
            >
              {message.text}
            </div>
          ))}
        </div>
        <input
          type="text"
          className="ip_cb"
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const userMessage = e.target.value;
              handleUserMessage(userMessage);
              e.target.value = "";
            }
          }}
        />
      </div>
    </div>
  );
};

export default Chatbot;
