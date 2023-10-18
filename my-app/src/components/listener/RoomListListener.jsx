import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../UserContext";
import { io } from "socket.io-client";
import axios from "axios";

const RoomListListener = (props) => {
  const { user, socket } = useContext(UserContext);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    if (socket !== null) {
      // Fetch the list of rooms from the backend API
      console.log("Fetching rooms for user:", user);

      socket.emit("getRooms", user);
      console.log(user.user._id);
      socket.on("rooms", (data) => {
        // console.log("Rooms fetched:", data);
        setRooms(data);
      });

      // Set up a timer to periodically fetch the list of rooms
      const intervalId = setInterval(() => {
        socket.emit("getRooms", user);
      }, 5000); // Fetch the rooms every 5 seconds

      // Clean up the timer when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, [socket, user]);

  // const handleRoomSelect = async (room) => {
  //   console.log("Room selected:", room);
  //   const senderId =
  //     user.user._id === room.listener ? room.member : room.listener;
  //   try {
  //     let response;
  //     if (user.user._id === room.listener) {
  //       // response = await axios.get(
  //       //   `http://localhost:5000/listener/getListener/${senderId}`
  //       // );
  //       response = await axios.get(`http://localhost:5000/getUser/${senderId}`);
  //     } else {
  //       // response = await axios.get(`http://localhost:5000/getUser/${senderId}`);
  //       response = await axios.get(
  //         `http://localhost:5000/listener/getListener/${senderId}`
  //       );
  //     }
  //     const sender = response.data;
  //     if (!sender) {
  //       console.error("Sender not found");
  //       return;
  //     }
  //     const roomName = room.roomname;
  //     console.log("Room name:", roomName);
  //     props.onRoomSelect({ ...room, roomName });
  //     socket.emit("instantJoin", room);
  //     console.log("Sender information:", sender);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleRoomSelect = async (room) => {
    console.log("Room selected:", room);
    const senderId =
      user.user._id === room.listener ? room.member : room.listener;
    try {
      let response;
      if (user.user._id === room.listener) {
        response = await axios.get(`http://localhost:5000/getUser/${senderId}`);
      }

      const sender = response.data;

      if (!sender) {
        console.error("Sender not found");
        // Handle this case, e.g., show a message to the user or perform a different action.
        return;
      }

      const roomName = room.roomname;
      console.log("Room name:", roomName);
      props.onRoomSelect({ ...room, roomName });
      socket.emit("instantJoin", room);
      console.log("Sender information:", sender);
    } catch (error) {
      console.error(error);
      // Handle the error, show a message to the user, or perform error-specific actions.
    }
  };

  useEffect(() => {
    // Fetch the latest message for each room
    rooms.forEach((room) => {
      socket.emit("getLatestMessage", room._id);
      socket.on(`latestMessage-${room._id}`, (data) => {
        console.log("Latest message fetched for room:", room._id);
        // Update the room object with the latest message
        const updatedRoom = { ...room, latestMessage: data };
        setRooms((prevRooms) =>
          prevRooms.map((prevRoom) =>
            prevRoom._id === updatedRoom._id ? updatedRoom : prevRoom
          )
        );
      });
    });
  }, [rooms, socket]);

  const [senderName, setSenderName] = useState("");

  useEffect(() => {
    const fetchSenderName = async (senderId) => {
      try {
        console.log("Fetching sender name for sender ID:", senderId);
        const response = await axios.get(
          `http://localhost:5000/getUser/${senderId}`
        );
        console.log("Response:", response);
        const senderName = response.data.username;
        setSenderName((prevSenderNames) => ({
          ...prevSenderNames,
          [senderId]: senderName,
        }));
      } catch (error) {
        console.error(error);
      }
    };

    rooms.forEach((room) => {
      const senderId =
        user.user._id !== room.member ? room.member : room.listener;
      fetchSenderName(senderId);
    });
  }, [rooms, user.user._id]);

  return (
    <div>
      <ul>
        {rooms.map((room) => {
          // Determine the sender ID based on whether the logged-in user is the member or listener of the room
          const senderId =
            user.user._id !== room.member ? room.member : room.listener;
          // Render the room details with the sender name
          return (
            <li key={room._id}>
              <button onClick={() => handleRoomSelect(room)}>
                Sender Name: {senderName[senderId]}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RoomListListener;
