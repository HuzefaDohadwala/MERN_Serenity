import React, { useState, useEffect, useContext } from "react";
import "./ListLanding1.css";
import NavList from "./NavList";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { UserContext } from "../../UserContext";
import ChatRoom from "../ChatRoom"; // import the ChatRoom component

const ListLanding1 = (props) => {
  const { user } = props;
  const { socket, setSocket } = useContext(UserContext);

  const [open, setOpen] = useState(false);
  const [memberSocket, setMemberSocket] = useState(null); // Member socket
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  const [showChatRoom, setShowChatRoom] = useState(false); // add state variable for chat room
  const [data, setData] = useState({});

  const handleOpen = () => {
    console.log("See Requests button clicked");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Handle Accept button click
  const handleAccept = (request) => () => {
    console.log("Accepting request:", request);

    const memberSocket = request.socket;
    console.log("Member socket:", memberSocket);

    console.log("User", user);

    // Emit the accept event to the server with the request details
    socket.emit("requestAccepted", request, {
      // username: user.listenerUsername,
      listener: user,
      socket: socket.id,
    });

    // Store the memberSocket value in the component state
    setMemberSocket(memberSocket);
  };

  useEffect(() => {
    if (socket === null) {
      const newSocket = io("http://localhost:5000", {
        cors: {
          origin: "http://localhost:3000",
          credentials: true,
        },
      });

      newSocket.on("connect", () => {
        console.log("Socket.IO connection opened");

        newSocket.emit("listenerDetails", user);
        setSocket(newSocket);
      });
    }
  }, [socket, user, setSocket]);

  useEffect(() => {
    if (open && socket !== null) {
      console.log("Listening for requests");
      // Listen for incoming requests
      socket.on("request", (request) => {
        console.log("Request received:", request);
        setRequests((prevRequests) => [...prevRequests, request]);
      });

      // Listen for updates to the requests set
      socket.on("requestsUpdate", (updatedRequests) => {
        console.log("Updated Requests received:", updatedRequests);
        setRequests(updatedRequests);
      });

      // // Listen for the roomJoined event
      socket.on("roomJoined", (data) => {
        console.log("roomJoined event received:", data.roomName);
        console.log("Data :", data);
        setData(data);
        setShowChatRoom(true);
      });
    }
  }, [open, socket, memberSocket, navigate]);

  return (
    <div>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-200 p-4">
          <div className="mem1_btn">
            <button onClick={handleOpen}>See Requests</button>
          </div>
          {/* You can add any other elements or components here if needed */}
        </div>

        {/* Chat area */}
        <div className="w-3/4 bg-gray-100 p-4">
          {/* Render the content when needed */}

          {showChatRoom && data.roomName && (
            <ChatRoom roomName={data.roomName} />
          )}
          {!showChatRoom && (
            <div className="ml1_container">
              <div className="ml1_title">
                <h1>Welcome {user.listenerUsername}</h1>
                <h1>Have a chat with the members</h1>
              </div>
              <div className="ml1_text">
                <p>See requests of members who chose you.</p>
                <p>Chat with members you previously talked to.</p>
              </div>
              <div className="mem1Btn_area">
                <div className="mem1_btn">
                  <button>Text Member</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Requests</DialogTitle>
        <DialogContent>
          {requests.map((request) => (
            <Card key={request.id}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {request.id}
                </Typography>
                <Typography color="textSecondary">
                  {request.member.user.username}
                </Typography>
                <Typography variant="body2" component="p">
                  {request.message}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={handleAccept(request)}>
                  Accept
                </Button>
              </CardActions>
            </Card>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ListLanding1;
