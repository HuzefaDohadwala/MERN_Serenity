import React, { useState, useEffect, useContext } from "react";
import "./MemLanding1.css";
import { io } from "socket.io-client";
import { UserContext } from "../../UserContext";
import { useNavigate } from "react-router-dom";

const MemLanding1 = () => {
  const { user } = useContext(UserContext);

  const [socket, setSocket] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [listener, setListener] = useState(null);
  const [roomName, setRoomName] = useState(null);
  const navigate = useNavigate();

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

  // handle joinRoom event
  useEffect(() => {
    if (socket !== null) {
      socket.on("joinRoom", ({ roomName, listener }) => {
        console.log(
          `Joining room ${roomName} with listener ${listener.username}`
        );

        // store the roomName and listener properties in the state
        setRoomName(roomName);
        setListener(listener);
        setShowPopUp(true);
      });
    }
  }, [socket]);

  // handle roomJoined event
  useEffect(() => {
    if (socket !== null) {
      socket.on("roomJoined", ({ roomName, listener }) => {
        console.log(
          `Joined room ${roomName} with listener ${listener.username}`
        );
        // store the roomName and listener properties in the state
        setRoomName(roomName);
        setListener(listener);
      });
    }
  }, [socket]);

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
          socket: newSocket.id,
        });
        //log the socket id
        console.log("Socket ID:", newSocket.id);
        setSocket(newSocket);
      });
    } else {
      console.log("Socket.IO connection already open");
      console.log("Requesting a listener for user:", user.user.username);
      socket.emit("memberDetails", user);
      console.log("Emitting request event to server");
      socket.emit("request", {
        member: user,
        message: "Anxiety",
        socket: socket.id,
      });
    }
  };

  const handleJoinRoomClick = () => {
    console.log("Join Room button clicked");
    setShowPopUp(false);

    socket.emit("roomJoined", { roomName, listener });
    console.log("Emitting roomJoined event to server");
    navigate(`/chat/${roomName}`);
  };

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
      {showPopUp && (
        <div className="pop-up">
          <h2>Chat with {listener.username}</h2>
          <p>Do you want to join the chat room?</p>
          <div className="pop-up-buttons">
            <button onClick={() => setShowPopUp(false)}>Cancel</button>
            <button onClick={handleJoinRoomClick}>Join Room</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemLanding1;
