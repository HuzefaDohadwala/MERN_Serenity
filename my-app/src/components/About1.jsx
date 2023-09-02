import React from "react";
import "./About1.css";
import About1Vid from "./About1Vid.mp4";

const About1 = () => {
  return (
    <div className="about1-container">
      <video className="about-us-video" autoPlay loop muted>
        <source src={About1Vid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <h1 className="about1-title">About Us</h1>
      <div className="about1_text">
        <p>
          We believe therapy is an essential part of becoming the best versions
          of
        </p>
        <p>
          ourselves. No matter who you are or where you are starting, it’s more
        </p>
        <p>
          than support through challenge – it’s the foundation to grow, heal and
        </p>
        <p>
          lead lives that are more resilient, empathic, hopeful and powerful.
        </p>
      </div>
    </div>
  );
};

export default About1;
