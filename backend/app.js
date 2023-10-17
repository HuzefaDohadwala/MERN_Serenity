const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/user-routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");
const Room = require("./models/Room");
const e = require("express");
const app = express();
const Message = require("./models/Message");

const allowedOrigins = ["http://localhost:3000"]; // replace with your frontend URL
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
// Add this middleware to set the Access-Control-Allow-Origin header
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});
app.use(cookieParser());
app.use(express.json());
app.use("/", router);
app.use("/listener", require("./routes/listener-routes"));
app.use("/api", require("./routes/api-routes"));

// create a server
const server = http.createServer(app);
// create a socket
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
  transport: ["websocket"], // Helps with the CORS error
});
const socketsInRoom = new Map();
const membersAndListenersInRoom = new Map(); // Stores the roomName and corresponding members and listeners
const listeners = new Set();
const members = new Set();
const requests = new Set();

const util = require("util");
// const promisifyRoomFindOne = util.promisify(Room.findOne);

// listen for a connection
io.on("connection", (socket) => {
  console.log("Socket.IO connection opened");

  socket.on("roomJoined", (data) => {
    // Add the member to the private room
    socket.join(data.roomName);
    console.log(socket.id);

    console.log("Room Joined event called!!!");
    console.log("Data inside the params:", data);

    const listenerSocket = data.info.listener.socket;
    console.log("Listener socket:", listenerSocket);
    console.log("Room name:", data.roomName);
    io.to(listenerSocket).emit("roomJoined", {
      roomName: data.roomName,
      listener: data.info,
    });
    const socketsInRoom = io.sockets.adapter.rooms.get(data.roomName);
    console.log("Sockets in room:", socketsInRoom);
  });

  socket.on("getRooms", (data) => {
    // query the database to get the room details
    console.log("Get rooms called!!!");
    // console.log("Data inside the params:", data);
    // console.log("User id:", data.user._id);
    Room.find({
      $or: [{ member: data.user._id }, { listener: data.user._id }],
    })
      .exec()
      .then((rooms) => {
        // console.log("Rooms found in db:", rooms);
        socket.emit("rooms", rooms);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  socket.on("instantJoin", (data) => {
    console.log("Instant join called!!!");
    console.log("Data inside the params:", data);
    socket.join(data.roomname);
    console.log("Room Joined");

    const socketsInRoom = io.sockets.adapter.rooms.get(data.roomname);
    console.log("Sockets in room:", socketsInRoom);
  });

  socket.on("message", (message, roomName, senderId) => {
    console.log("message handler called!!!");
    console.log(`Received message in backend: ${message}`);
    console.log(`Sender ID: ${senderId}`);

    // query the database to get the room details
    Room.findOne({
      roomname: roomName,
      $or: [{ member: senderId }, { listener: senderId }],
    })
      .exec()
      .then((room) => {
        console.log("Room found in db:", room);
        let receiverId;
        if (room.member.toString() === senderId) {
          receiverId = room.listener;
        } else {
          receiverId = room.member;
        }
        console.log(`Receiver id: ${receiverId}`);

        // Save the message to the database with the sender, receiver, and room information
        const newMessage = new Message({
          sender: senderId,
          receiver: receiverId,
          message: message,
          timestamp: Date.now(),
          roomName: roomName,
        });
        return newMessage.save();
      })
      .then((savedMessage) => {
        console.log("Message saved to database:", savedMessage);

        // Broadcast the message to all sockets in the room
        io.to(roomName).emit("received-message", message);
        console.log("Message broadcasted to all sockets in the room");
      })
      .catch((err) => {
        console.log(err);
      });
  });

  socket.on("listenerDetails", (listener) => {
    console.log("Listener connected:", listener);
    console.log(listener._id);
    // Remove all entries from the listeners set that have the same id as the new listener
    listeners.forEach((l) => {
      if (l._id === listener._id) {
        listeners.delete(l);
        console.log("listener deleted!!");
      }
    });
    // Add listener details to a list of connected listeners
    console.log("listener added!!");
    listeners.add(listener);

    //log listeners
    console.log("Listeners:");
    listeners.forEach((listener) => {
      console.log(listener);
    });
  });

  socket.on("memberDetails", (member) => {
    console.log("Member connected:", member);
    // Remove all entries from the members set that have the same id as the new member
    console.log(member.user._id);

    members.forEach((m) => {
      if (m.user._id === member.user._id) {
        members.delete(m);
        console.log("member deleted!!");
      }
    });
    // Add member details to a list of connected members
    console.log("member added!!");
    members.add(member);
  });

  // Emit updated requests to all connected listeners whenever the requests set changes
  const emitRequestsUpdate = () => {
    io.emit("requestsUpdate", Array.from(requests));
  };

  // handle listener requests from members
  socket.on("request", (request) => {
    console.log("Handle request called!!!");
    console.log("Request received:", request);

    // Delete the existing request from the set if the user._id in that request matches the user._id of the person making the new request
    requests.forEach((req) => {
      if (req.member.user._id === request.member.user._id) {
        requests.delete(req);
        console.log("Existing request deleted!!");
      }
    });

    // Add the new request to the set of requests
    requests.add(request);

    // Emit the request to all connected listeners
    console.log("Emitted requests to listeners!!");
    listeners.forEach((listener) => {
      io.to(listener.socket).emit("request", request);
    });

    //log members
    console.log("Members:");
    members.forEach((member) => {
      console.log(member);
    });

    // log requests
    console.log("Requests:");
    requests.forEach((request) => {
      console.log(request);
    });

    emitRequestsUpdate();
  });

  // handle listener accept request
  socket.on("requestAccepted", (request, data) => {
    console.log("Request accepted:", request);
    console.log("Data inside the params:", data); // this is socket wala data

    mem = request.member;
    memSocket = request.socket;
    console.log(memSocket);

    console.log("Listener object:", data);
    // listSocket = listener.socket;

    console.log(data.listener.listenerUsername);
    console.log(data.socket);

    // Remove the accepted request from the set of requests
    requests.forEach((req) => {
      if (req.member.user._id === request.member.user._id) {
        requests.delete(req);
        console.log("Request deleted!!");
      }
    });

    // log requests
    console.log("Requests:");
    requests.forEach((request) => {
      console.log(request);
    });

    // Emit updated requests to all connected listeners
    emitRequestsUpdate();

    // Check for already existing room
    console.log("Checking for already existing room");
    Room.findOne({
      member: mem.user._id,
      listener: data.listener._id,
    }).then((existingRoom) => {
      if (existingRoom) {
        console.log("Room already exists");
        console.log(existingRoom);
        console.log("Joining existing room");
        socket.join(existingRoom.roomname);
        console.log("Room Joined");
        const rooom = existingRoom.roomname;
        console.log(rooom);

        // add them to the socketsInRoom map
        if (!socketsInRoom.has(existingRoom.roomname)) {
          socketsInRoom.set(existingRoom.roomname, new Set());
        }
        socketsInRoom.get(existingRoom.roomname).add(data.socket);
        console.log("Added listener to room");
        socketsInRoom.get(existingRoom.roomname).add(memSocket);
        console.log("Added member to room");
        console.log("Sockets in room:");
        socketsInRoom.forEach((sockets, room) => {
          console.log(room, [...sockets]);
        });

        console.log("Socket I am emmitting to:", memSocket);

        console.log("Emitting roomJoined event");
        console.log("Before Emitting");
        console.log(rooom);
        console.log(data.listener);
        io.to(memSocket).emit("joinRoom", {
          roomName: rooom,
          listener: data, //passed data withsocket to the member
        });
        console.log("Member informed about room:");
      } else {
        // Create a new room with a unique name
        console.log("Creating new room with unique name");

        let roomName;
        if (request.id) {
          roomName = `request-${request.id}`;
        } else {
          const timestamp = Date.now();
          roomName = `member-${request.member.user._id}-${timestamp}`;
        }

        console.log("Room name:", roomName);
        console.log("Listener joining room:");
        socket.join(roomName);
        console.log("Listener socket :", data.socket);

        // Log the list of sockets in the room
        // const socketsInRoom = io.sockets.adapter.rooms.get(roomName);
        if (!socketsInRoom.has(roomName)) {
          socketsInRoom.set(roomName, new Set());
        }
        socketsInRoom.get(roomName).add(data.socket);
        socketsInRoom.get(roomName).add(memSocket);

        console.log(
          `Sockets in room ${roomName}:`,
          socketsInRoom.get(roomName)
        );
        console.log("Sockets in room:");
        socketsInRoom.forEach((sockets, room) => {
          console.log(room, [...sockets]);
        });

        console.log("Socket I am emmitting to:", memSocket);

        if (!membersAndListenersInRoom.has(roomName)) {
          membersAndListenersInRoom.set(roomName, new Set());
        }

        console.log("Listener Id: ", data.listener._id);
        console.log("Member Id: ", mem.user._id);
        membersAndListenersInRoom.get(roomName).add(data.listener._id);
        membersAndListenersInRoom.get(roomName).add(mem.user._id);

        console.log("saving room details in db");

        const room = new Room({
          roomname: roomName,
          member: mem.user._id,
          listener: data.listener._id,
        });
        room
          .save()
          .then((room) => {
            console.log("Room saved in db");
            console.log(room);
          })
          .catch((err) => {
            console.log(err);
          });

        console.log("Members and Listeners in room:");
        membersAndListenersInRoom.forEach((membersAndListeners, room) => {
          console.log(room, [...membersAndListeners]);
        });
        console.log("Before Emitting ");
        console.log(roomName);
        console.log(data.listener);
        io.to(memSocket).emit("joinRoom", {
          roomName: roomName,
          listener: data,
        });
        console.log("Member informed about room:");
      }
    });
  });

  socket.on("disconnect", () => {
    console.log("Socket.IO connection closed");
    if (listeners.has(socket)) {
      const listener = Array.from(listeners).find(
        (listener) => listener.socket === socket
      );
      console.log("Listener disconnected:", listener);
      listeners.delete(listener);
    } else if (members.has(socket)) {
      const member = Array.from(members).find(
        (member) => member.socket === socket
      );
      console.log("Member disconnected:", member);
      members.delete(member);

      // Remove all requests from the disconnected member
      requests.forEach((request) => {
        if (request.member.id === member.id) {
          requests.delete(request);
        }
      });
    }
  });
});

mongoose
  .connect(
    "mongodb+srv://ahkj:Y9Qj01QHl753QEPk@miniproject.kktnwsl.mongodb.net/BetterHelp?retryWrites=true&w=majority"
  )
  .then(() => {
    server.listen(5000);
    console.log("Listening on PORT 5000");
    console.log("MongoDB Connected!!");
  })
  .catch((err) => console.log(err));
