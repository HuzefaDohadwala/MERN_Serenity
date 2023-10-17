import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../src/UserContext";

const ChatRoom = ({ roomName }) => {
  console.log("Room name:", roomName);
  const { user } = useContext(UserContext);
  const { socket } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch the messages from the backend
    axios
      .get(`http://localhost:5000/api/messages/${roomName}`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });

    // Listen for the received-message event and update the messages array
    socket.on("received-message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);

      // Fetch the messages from the backend again
      axios
        .get(`http://localhost:5000/api/messages/${roomName}`)
        .then((response) => {
          setMessages(response.data);
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        });
    });

    // Clean up the event listener
    return () => {
      socket.off("received-message");
    };
  }, [roomName, socket]);

  const handleSendMessage = () => {
    // Emit the message to the server
    socket.emit("message", message, roomName, user.user._id);

    // Clear the message input
    setMessage("");
  };

  return (
    <div className="max-w-md mx-auto my-4">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="px-4 py-2 bg-gray-200 rounded-t-lg">
          <h2 className="text-lg font-bold text-gray-800">
            Chat Room: {messages.length > 0 ? messages[0].receiver : ""}
          </h2>
        </div>
        <div className="p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${
                message.sender === user.user._id ? "text-right" : "text-left"
              } mb-2`}
            >
              <div
                className={`${
                  message.sender === user.user._id
                    ? "bg-blue-500 text-white rounded-br-none rounded-tl-lg"
                    : "bg-gray-200 text-gray-800 rounded-bl-none rounded-tr-lg"
                } inline-block px-4 py-2 rounded-lg`}
              >
                {message.message}
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 py-2 bg-gray-200 rounded-b-lg">
          <div className="flex">
            <input
              type="text"
              className="flex-grow px-2 py-1 rounded-lg border border-gray-400 mr-2"
              placeholder="Type your message here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
