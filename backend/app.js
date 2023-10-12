const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/user-routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");

const app = express();

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

const listeners = new Set();
const members = new Set();
const requests = new Set();

// listen for a connection
io.on("connection", (socket) => {
  console.log("Socket.IO connection opened");

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
    console.log("Emitted requests to listeners");
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
  socket.on("requestAccepted", (request, listener) => {
    console.log("Request accepted:", request);

    // Add the listener details to the request object
    list = listener.username;
    mem = request.member;
    request.listener = list;

    console.log(listener.username);
    console.log(listener.socket);

   
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

    // Add the member and listener to a private room with a unique name based on the request ID
    console.log(
      "Adding member and listener to a private room with a unique name based on the request ID"
    );

    let roomName;
    if (request.id) {
      roomName = `request-${request.id}`;
    } else {
      const timestamp = Date.now();
      roomName = `member-${request.member.user._id}-${timestamp}`;
    }

    console.log("Room name:", roomName);
    console.log("Joining room:");
    socket.join(roomName);
    //log member socket
    // Log the list of sockets in the room
    const socketsInRoom = io.sockets.adapter.rooms.get(roomName);
    console.log("Sockets in room:", socketsInRoom);

    io.to(mem.user._id).emit("joinRoom", { roomName, listener });
    console.log("Member informed about room:");
  });

  socket.on("joinRoom", ({ roomName, listener }) => {
    // Add the member to the private room
    socket.join(roomName);

    // Emit a roomJoined event to both the member and listener
    io.to(mem.socket).emit("roomJoined", { roomName, listener });
    io.to(listener.socket).emit("roomJoined", { roomName, listener });
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
