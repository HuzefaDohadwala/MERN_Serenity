import React from "react";
import "./About2.css";
import About2Img from "./About2Img.jpg";

const About2 = () => {
  return (
    <div className="About2_container">
      <div className="about2_contImg">
        <div className="about2Img_container">
          <img src={About2Img} alt="logo" className="rounded-2xl about2_img" />
        </div>
      </div>
      <div className="about2_bottom">
        <div className="about2_opportunity">
          <h1>The Opportunity</h1>
        </div>
        <div className="about2_mission">
          <h1>The Mission</h1>
        </div>
      </div>
    </div>
  );
};

export default About2;
