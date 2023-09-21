import React from "react";
import MemLanding1 from "./MemLanding1";
import NavMem from "./NavMem";
import MemLanding2 from "./MemLanding2";
import MemLanding3 from "./MemLanding3";
import MemLanding4 from "./MemLanding4";
import Footer from "../Footer";

const MemLanding = () => {
  return (
    <div>
      <NavMem />
      <div className="scroll-container_5">
        <div className="scroll-area_5">
          <MemLanding1 />
        </div>
        <div className="scroll-area_5">
          <MemLanding2 />
        </div>
        <div className="scroll-area_5">
          <MemLanding3 />
        </div>
        <div className="scroll-area_5">
          <MemLanding4 />
        </div>
        <div className="scroll-area_5">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MemLanding;
