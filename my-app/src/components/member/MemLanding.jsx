import React, { useEffect, useState } from "react";
import MemLanding1 from "./MemLanding1";
import NavMem from "./NavMem";
import MemLanding2 from "./MemLanding2";
import MemLanding3 from "./MemLanding3";
import MemLanding4 from "./MemLanding4";
import { useLocation } from "react-router-dom";

const MemLanding = () => {
  const [user, setUser] = useState({});
  const location = useLocation();

  useEffect(() => {
    console.log("location.state:", location.state);
    const { state } = location;
    if (state && state.user) {
      console.log("user:", state.user);
      setUser(state.user);
    }
  }, [location]);

  console.log("user state:", user.user);

  return (
    <div>
      <NavMem />
      <MemLanding1 user={user.user} />
    </div>
  );
};

export default MemLanding;
