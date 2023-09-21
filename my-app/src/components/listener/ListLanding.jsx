import React from "react";
import NavList from "./NavList";
import ListLanding1 from "./ListLanding1";
import ListLanding2 from "./ListLanding2";
import ListLanding3 from "./ListLanding3";
import Footer from "../Footer";

const ListLanding = () => {
  return (
    <div>
      <NavList />
      <div className="scroll-container_5">
        <div className="scroll-area_5">
          <ListLanding1 />
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
