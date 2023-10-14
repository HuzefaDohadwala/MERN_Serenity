import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useContext } from "react";

import { UserContext } from "../../src/UserContext";

const ChatRoom = () => {
  const { roomName } = useParams();
  const { socket } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  // log roomname
  useEffect(() => {
    console.log("Room name:", roomName);

    // Listen for incoming messages
    socket.on("received-message", (message) => {
      console.log("Received message:", message);
      setMessages((messages) => [...messages, message]);
    });

    // Clean up the event listener
    return () => {
      socket.off("received-message");
    };
  }, [roomName, socket]);

  const handleSendMessage = () => {
    console.log("Sending message:", message);

    // Emit the message to the server
    console.log("Emitting message to the server!!");
    socket.emit("message", message, roomName);

    // Clear the message input
    setMessage("");
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Chat Room: {roomName}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              {messages.map((message, index) => (
                <Typography key={index} variant="body1">
                  {message}
                </Typography>
              ))}
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex" }}>
              <TextField
                label="Message"
                variant="outlined"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{ flexGrow: 1, mr: 2 }}
              />
              <Button variant="contained" onClick={handleSendMessage}>
                Send
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ChatRoom;
