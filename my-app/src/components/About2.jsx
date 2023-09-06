import React from "react";
import "./About2.css";
import About2Img from "./About2Img.jpg";
import mission from "./mission.png";
import opportunity from "./opportunity.png";

const About2 = () => {
  return (
    <div className="About2_container">
      <div className="circle_adi circle1_adi"></div>
      <div className="circle_adi circle2_adi"></div>
      <div className="about2_contImg">
        <div className="about2Img_container">
          <img src={About2Img} alt="logo" className="rounded-2xl about2_img" />
        </div>
      </div>
      <div className="about2_bottom">
        <div className="about2_opportunity">
          <div className="icon_cell">
            <img
              src={opportunity}
              alt="logo"
              className="about2_icon about2_oppIcon"
            />
          </div>
          <h1 className="about2_bottomTitle">The Opportunity</h1>
          <p>A platform that makes personalized</p>
          <p>therapy accessible for all, allowing therapists</p>
          <p>to serve their communities effectively,</p>
          <p>not just those who can afford it.</p>
        </div>
        <div className="about2_mission">
          <div className="icon_cell">
            <img src={mission} alt="logo" className="about2_icon" />
          </div>
          <h1 className="about2_bottomTitle">The Mission</h1>
          <p>Committed to increasing access to</p>
          <p>therapy by serving as a bridge between</p>
          <p>professional therapists and those in</p>
          <p>need of mental health support.</p>
        </div>
      </div>
    </div>
  );
};

export default About2;
