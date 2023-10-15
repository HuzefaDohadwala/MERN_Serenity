import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [rooms, setRooms] = useState([]);

  return (
    <UserContext.Provider value={{ user, setUser , socket, setSocket, rooms , setRooms}}>
      {children}
    </UserContext.Provider>
  );
};