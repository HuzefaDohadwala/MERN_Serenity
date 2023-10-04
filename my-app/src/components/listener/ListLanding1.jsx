// import React, { useState } from "react";
// import "./ListLanding1.css";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Card,
//   CardContent,
//   Typography,
//   CardActions,
//   Button,
// } from "@mui/material";
// import { useContext } from "react";
// import { UserContext } from "../../UserContext";
// import io from "socket.io-client";

// const ListLanding1 = (props) => {
//   const { user } = props;

//   const [open, setOpen] = useState(false);
//   const [socket, setSocket] = useState(null);
//   const [requests, setRequests] = useState([]);

//   const handleOpen = (listener) => {
//     console.log("See Requests button clicked");
//     setOpen(true);

//     if (socket === null) {
//       const newSocket = io("http://localhost:5000", {
//         cors: {
//           origin: "http://localhost:3000",
//           credentials: true,
//         },
//       });

//       newSocket.on("connect", () => {
//         console.log("Socket.IO connection opened");

//         newSocket.emit("listenerDetails", user);

//         // listen for incoming requests
//         newSocket.on("request", (request) => {
//           console.log("Request received:", request);
//           setRequests((prevRequests) => [...prevRequests, request]);
//           //log the request
//           console.log("Requests:", requests);
//         });
//       });

//       setSocket(newSocket);
//     }
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const { listener } = useContext(UserContext);

//   return (
//     <div className="ll1_container">
//       <div className="ll1_title">
//         <h1>Welcome {user.listenerUsername}</h1>
//         <h1>Have a chat with the members</h1>
//       </div>
//       <div className="ll1_text">
//         <p>See requests of members who chose you.</p>
//         <p>Chat with members you previously talked to.</p>
//       </div>
//       <div className="list1Btn_area">
//         <div className="list1_btn">
//           <button onClick={handleOpen}>See Requests</button>
//         </div>
//         <div className="list1_btn">
//           <button>Text Member</button>
//         </div>
//       </div>
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Requests</DialogTitle>
//         <DialogContent>
//           {requests.map((request) => (
//             <Card key={request.id}>
//               <CardContent>
//                 <Typography variant="h5" component="h2">
//                   Request {request.id}
//                 </Typography>
//                 <Typography color="textSecondary">
//                   Member: {request.member.username}
//                 </Typography>
//                 <Typography variant="body2" component="p">
//                   {request.message}
//                 </Typography>
//               </CardContent>
//               <CardActions>
//                 <Button size="small">Accept</Button>
//                 <Button size="small">Decline</Button>
//               </CardActions>
//             </Card>
//           ))}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Close</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default ListLanding1;

import React, { useState, useEffect } from "react";
import "./ListLanding1.css";
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
import io from "socket.io-client";

const ListLanding1 = (props) => {
  const { user } = props;

  const [open, setOpen] = useState(false);
  const [socket, setSocket] = useState(null);
  const [requests, setRequests] = useState([]);

  const handleOpen = () => {
    console.log("See Requests button clicked");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Handle Accept button click
  const handleAccept = (request) => () => {
    console.log("Accepting request :", request);

    // Emit the accept event to the server with the request details
    socket.emit("requestAccepted", request, {
      username: user.listenerUsername,
      socket: socket.id,
    });
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
      });

      setSocket(newSocket);
    }
  }, [socket, user]);

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
    }
  }, [open, socket]);

  return (
    <div className="ll1_container">
      <div className="ll1_title">
        <h1>Welcome {user.listenerUsername}</h1>
        <h1>Have a chat with the members</h1>
      </div>
      <div className="ll1_text">
        <p>See requests of members who chose you.</p>
        <p>Chat with members you previously talked to.</p>
      </div>
      <div className="list1Btn_area">
        <div className="list1_btn">
          <button onClick={handleOpen}>See Requests</button>
        </div>
        <div className="list1_btn">
          <button>Text Member</button>
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
