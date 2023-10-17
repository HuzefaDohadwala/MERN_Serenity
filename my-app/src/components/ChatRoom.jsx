import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
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

const ChatRoom = ({ roomName }) => {
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
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {/* Chat Room: {roomName} */}
          Chat Room: {messages.length > 0 ? messages[0].receiver : ""}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              {messages.map((message, index) => (
                <Typography key={index} variant="body1">
                  {/* {message.sender} to {message.receiver}: {message.message} (
                  {message.timestamp}) */}
                  {message.message}
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
