import React, { useEffect, useState } from "react";
import MemLanding1 from "./MemLanding1";
import NavMem from "./NavMem";
import MemLanding2 from "./MemLanding2";
import MemLanding3 from "./MemLanding3";
import MemLanding4 from "./MemLanding4";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../UserContext";

const MemLanding = () => {
  const { user } = useContext(UserContext); // Use the user state from the UserContext
  const location = useLocation();

  useEffect(() => {
    console.log("Memberlanding component mounted");
    console.log("User:", user);
  }, [user]);
  console.log("user state:", user.user);

  return (
    <div>
      <NavMem />
      <MemLanding1 />
    </div>
  );
};

export default MemLanding;
