import React from "react";
import NavList from "./NavList";
import ListLanding1 from "./ListLanding1";
import ListLanding2 from "./ListLanding2";
import ListLanding3 from "./ListLanding3";
import Footer from "../Footer";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../UserContext";

const ListLanding = () => {
  const { user } = useContext(UserContext); // Use the user state from the UserContext
  const location = useLocation();

  useEffect(() => {
    console.log("ListenerLanding component mounted");
    console.log("User:", user);
  }, [user]);

  return (
    <div>
      <NavList />
      <div className="scroll-container_5">
        <div className="scroll-area_5">
          <ListLanding1 user={user.user} />
        </div>
        <div className="scroll-area_5">
          <ListLanding2 />
        </div>
        <div className="scroll-area_5">
          <ListLanding3 />
        </div>
        <div className="scroll-area_5">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ListLanding;
