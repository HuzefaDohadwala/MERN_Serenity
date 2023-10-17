import React from "react";

const RoomListListener = () => {
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

  const handleRoomSelect = (room) => {
    console.log("Room selected:", room);
    props.onRoomSelect(room);
    socket.emit("instantJoin", room);
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

  return (
    <div>
      <h2>Rooms</h2>
      <ul>
        {rooms.map((room) => {
          // Determine the sender ID based on whether the logged-in user is the member or listener of the room
          const senderId =
            user.user._id !== room.member ? room.member : room.listener;
          // Render the room details with the sender ID
          return (
            <li key={room._id}>
              <button onClick={() => handleRoomSelect(room)}>
                Sender ID: {senderId}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RoomListListener;
