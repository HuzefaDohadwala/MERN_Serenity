import React from "react";
import NavList from "./NavList";
import ListLanding1 from "./ListLanding1";
import ListLanding2 from "./ListLanding2";
import ListLanding3 from "./ListLanding3";
import Footer from "../Footer";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const ListLanding = () => {
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
