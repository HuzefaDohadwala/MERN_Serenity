import React, { useState, useEffect, useContext } from "react";
import "./MemLanding1.css";
import { io } from "socket.io-client";
import { UserContext } from "../../UserContext";

const MemLanding1 = () => {
  const { user } = useContext(UserContext);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    console.log("User data changed:", user);
    localStorage.setItem("user", JSON.stringify(user));
    console.log("User data saved in local storage:", user);
  }, [user]);

  useEffect(() => {
    window.onload = () => {
      setIsReady(true);
    };
  }, []);

  useEffect(() => {
    if (isReady) {
      // Retrieve user data from local storage
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (storedUser) {
        console.log("User data retrieved from local storage:", storedUser);
      }
    }
  }, [isReady]);

  const handleFindListener = () => {
    console.log("Find Listener button clicked");
    if (socket === null) {
      const newSocket = io("http://localhost:5000", {
        cors: {
          origin: "http://localhost:3000",
          credentials: true,
        },
      });
      newSocket.on("connect", () => {
        console.log("Socket.IO connection opened");
        console.log("Requesting a listener for user:", user.user.username);
        newSocket.emit("memberDetails", user);

        // Emit the request event to the server with the member details and a message
        newSocket.emit("request", {
          member: user,
          message: "Anxiety",
        });
      });

      setSocket(newSocket);
    } else {
      console.log("Socket.IO connection already open");
      console.log("Requesting a listener for user:", user.user.username);
      socket.emit("memberDetails", user);
      console.log("Emitting request event to server");
      socket.emit("request", {
        member: user,
        message: "Anxiety",
      });
    }
  };

  const [socket, setSocket] = useState(null);

  return (
    <div className="ml1_container">
      <div className="ml1_title">
        <h1>Welcome {user.user.username}</h1>
        <h1>Get Yourself someone who will listen to you!!</h1>
      </div>
      <div className="ml1_text">
        <p>Send a request to a listener of your choice.</p>
        <p>Chat with listeners preiously chosen by you.</p>
      </div>
      <div className="mem1Btn_area">
        <div className="mem1_btn">
          <button onClick={handleFindListener}>Find Listener</button>
        </div>
        <div className="mem1_btn">
          <button>Text Listener</button>
        </div>
      </div>
    </div>
  );
};

export default MemLanding1;
