import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../src/UserContext";
import send from "./send.png";

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
    <div className="w-full h-96">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="px-4 py-2 bg-[#7e506c] rounded-t-lg">
          <h2 className="text-lg font-bold text-white">
            Chat Room: {messages.length > 0 ? messages[0].receiver : ""}
          </h2>
        </div>
        <div className="p-4 bg-[#e6e6fa]">
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
                    ? "bg-[#a48aa8] text-black font-medium rounded-br-none rounded-tl-lg"
                    : "bg-[#d96a94] text-black font-medium rounded-bl-none rounded-tr-lg"
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
              className="px-4 py-2 bg-gradient-to-r from-[#d96a94] to-[#b8a8c4] text-white rounded-lg hover:shadow-2xl hover:scale-110 active:bg-opacity-80 active:scale-100"
              onClick={handleSendMessage}
            >
              <img src={send} alt="send" className="w-8 h-8 " />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
