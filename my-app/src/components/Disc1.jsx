import React from "react";
import "./Disc1.css";
import disc_image from './disc_image.jpg';

const Disc1 = () => {
  return (
    <>
      <div className="disc1">
        <div className="disc1_left">
          <div className="heading_disc1">
            <h1>Unveiling Pathways to</h1>
            <h1>Inner Harmony and Growth</h1>
          </div>
          <div className="subheading_disc1">
            <h2>Real Stories, Answers,</h2>
            <h2>and a Step-by-Step Guide </h2>
            <h2> to Your Wellness Journey.</h2>
          </div>
          <img src={disc_image} alt="logo" className="disc_image" />
        </div>
      </div>
    </>
  );
};

export default Disc1;
