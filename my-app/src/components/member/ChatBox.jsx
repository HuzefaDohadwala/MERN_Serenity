import React, { useState, useEffect, useContext } from "react";
import "./ChatBox.css";
import send from "./send.png";
import { UserContext } from "../../UserContext";
import axios from "axios";

const ChatBox = () => {
  const { user } = useContext(UserContext);
  const { socket } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch the messages from the backend
    fetchMessages();

    // Listen for the received-message event and update the messages array
    socket.on("received-message", (message) => {
      console.log("Received message:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up the event listener
    return () => {
      socket.off("received-message");
    };
  }, [socket]);

  const fetchMessages = () => {
    axios
      .get(`http://localhost:5000/api/messages/${user.user._id}`)
      .then((response) => {
        console.log("Fetched messages:", response.data);
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  };

  const handleSendMessage = () => {
    console.log("Sending message:", message);

    // Emit the message to the server
    console.log("Emitting message to the server!!");
    socket.emit("message", message, user.user._id);

    // Clear the message input
    setMessage("");
  };

  return (
    <div className="ChatBoxMem">
      <div className="cbm_container">
        <div className="UserName_mem">
          <h1 className="UserNameText_mem">{user.user.name}</h1>
        </div>
        <div className="ChatSection_member">
          {messages.map((message, index) => (
            <div key={index}>
              <p>
                {message.sender.name} to {message.receiver.name}:{" "}
                {message.message} ({message.timestamp})
              </p>
            </div>
          ))}
        </div>
        <div className="Input_member">
          <div className="ip_left">
            <input
              className="InputField_mem"
              type="text"
              placeholder="    Type here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button className="send_right" onClick={handleSendMessage}>
            <img src={send} alt={send} className="send-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
