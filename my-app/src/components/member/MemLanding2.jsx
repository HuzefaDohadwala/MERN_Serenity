import React from "react";
import "./MemLanding2.css";

const MemLanding2 = () => {
  return (
    <div className="ml2_container">
      <div className="ml2_title">
        <h1>Seek Professional Help</h1>
      </div>
      <div className="ml2_text">
        <p>Seek Professional Help from Certified Therapists.</p>
        <p>Book a Virtual Meeting or an Inperson Meeting.</p>
      </div>
      <div className="mem2Btn_area">
        <div className="mem2_btn">
          <button>View Therapists</button>
        </div>
        <div className="mem2_btn">
          <button>Text Therapists</button>
        </div>
        <div className="mem2_btn">
          <button>Book a Meet</button>
        </div>
      </div>
    </div>
  );
};

export default MemLanding2;
