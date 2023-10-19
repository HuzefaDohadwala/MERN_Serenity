import React, { useState, useEffect, useContext } from "react";
import "./ListLanding1.css";
import { io } from "socket.io-client";
import { UserContext } from "../../UserContext";
import { useNavigate } from "react-router-dom";
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
import ChatRoom from "../ChatRoom";
import ListExplore from "./ListExplore";
import ListMemes from "./ListMemes";
import ListProfile from "./ListProfile";
import communication from "./Communication.png";
import cosultauion from "./consultation.png";
import loupe from "./loupe.png";
import happy from "./happy.png";
import exit from "./exit.png";
import listen from "./listen.png";
import profile from "./user.png";
import RoomList from "../RoomList";
import RoomListListener from "./RoomListListener";

const ListLanding1 = () => {
  const { user, socket, setSocket } = useContext(UserContext);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [open, setOpen] = useState(false);
  const [memberSocket, setMemberSocket] = useState(null);
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  const [showChatRoom, setShowChatRoom] = useState(false);
  const [data, setData] = useState({});
  const [showMemes, setShowMemes] = useState(false);
  const [showExplore, setShowExplore] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleOpen = () => {
    console.log("See Requests button clicked");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = (request) => () => {
    console.log("Accepting request:", request);

    const memberSocket = request.socket;
    console.log("Member socket:", memberSocket);

    socket.emit("requestAccepted", request, {
      listener: user,
      socket: socket.id,
    });

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
      socket.on("request", (request) => {
        console.log("Request received:", request);
        setRequests((prevRequests) => [...prevRequests, request]);
      });

      socket.on("requestsUpdate", (updatedRequests) => {
        console.log("Updated Requests received:", updatedRequests);
        setRequests(updatedRequests);
      });

      socket.on("roomJoined", (data) => {
        console.log("roomJoined event received:", data.roomName);
        console.log("Data :", data);
        setData(data);
        setShowChatRoom(true);
      });
    }
  }, [open, socket, memberSocket, navigate]);

  const handleMemesClick = () => {
    setShowMemes(true);
    setShowExplore(false);
    setShowChatRoom(false);
    setShowProfile(false);
  };

  const handleExploreClick = () => {
    setShowMemes(false);
    setShowExplore(true);
    setShowChatRoom(false);
    setShowProfile(false);
  };

  const handleProfileClick = () => {
    setShowMemes(false);
    setShowExplore(false);
    setShowChatRoom(false);
    setShowProfile(true);
  };

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
  };

  return (
    <div>
      <div className="flex h-screen">
        <div className="w-3/12 flex bg-[#E6E6FA]">
          <div className="w-3/12">
            <button
              className="relative bg-gradient-to-r from-[#d96a94] to-[#b8a8c4] rounded-full p-5 mt-20 ml-2 w-16 h-16 mb-4 shadow-lg hover:shadow-2xl hover:scale-110 active:bg-opacity-80 active:scale-100"
              onClick={handleOpen}
            >
              <img
                src={communication}
                alt="logo"
                className="about2_icon about2_oppIcon ml_icon"
              />
            </button>

            <button
              className="relative bg-gradient-to-r from-[#d96a94] to-[#b8a8c4] rounded-full p-5 ml-2 w-16 h-16 mb-4 shadow-lg hover:shadow-2xl hover:scale-110 active:bg-opacity-80 active:scale-100"
              onClick={handleExploreClick}
            >
              <img
                src={loupe}
                alt="explore"
                className="about2_icon about2_oppIcon"
              />
            </button>
            <button
              className="relative bg-gradient-to-r from-[#d96a94] to-[#b8a8c4] rounded-full p-5 ml-2 w-16 h-16 mb-4 shadow-lg hover:shadow-2xl hover:scale-110 active:bg-opacity-80 active:scale-100"
              onClick={handleMemesClick}
            >
              <img
                src={happy}
                alt="meme"
                className="about2_icon about2_oppIcon"
              />
            </button>
            <button
              className="relative bg-gradient-to-r from-[#d96a94] to-[#b8a8c4] rounded-full p-5 ml-2 w-16 h-16 mb-4 shadow-lg hover:shadow-2xl hover:scale-110 active:bg-opacity-80 active:scale-100"
              onClick={handleProfileClick}
            >
              <img
                src={profile}
                alt="profile"
                className="about2_icon about2_oppIcon"
              />
            </button>
            <button className="relative bg-gradient-to-r from-[#d96a94] to-[#b8a8c4] rounded-full p-5 ml-2 w-16 h-16 mb-4 shadow-lg hover:shadow-2xl hover:scale-110 active:bg-opacity-80 active:scale-100">
              <img
                src={exit}
                alt="meme"
                className="about2_icon about2_oppIcon"
              />
            </button>
          </div>
          <div className="w-9/12 pt-20">
            <RoomListListener onRoomSelect={handleRoomSelect} />
          </div>
        </div>

        <div className="w-9/12 bg-gray-100 p-4">
          {showChatRoom && data.roomName && (
            <ChatRoom roomName={data.roomName} />
          )}
          {showMemes && <ListMemes />}
          {showExplore && <ListExplore />}
          {showProfile && <ListProfile />}
          {!showChatRoom && !showMemes && !showExplore && !showProfile && (
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
