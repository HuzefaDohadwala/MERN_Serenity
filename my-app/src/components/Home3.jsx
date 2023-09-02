import React from "react";
import "./Home3.css";
import Mpr3 from "../components/Mpr3.jpg";

const Home3 = () => {
  return (
    <>
      <div className="home3">
        <div className="circle_adi circle3_adi"></div>
        <div className="circle_adi circle1_adi"></div>
        <div className="circle_adi circle2_adi"></div>
        <div className="heading_home3">
          <h1>Uncover therapists perfectly</h1>
          <h1>tailored to your journey</h1>
        </div>
        <div className="text_home3">
          <p>Explore a world of caring professionals,</p>
          <p>handpicked to support and guide you through</p>
          <p>every twist and turn of your life's story.</p>
        </div>
        <div className="bottom_home3 flex justify-center items-center">
          <div className="leftFlex_home3 justify-center items-center">
            <div className="heading2_home3">
              <h1>Connect in your</h1>
              <h1>comfort zone</h1>
            </div>
            <div className="text2_home3">
              <p>You can meet your provider in</p>
              <p>person or virtually, whichever works</p>
              <p>best for you.</p>
            </div>
            <button className="customButton3">Find a Therapist</button>
          </div>
          <div className="rightFlex_home3 flex justify-center">
            <div className="img-container relative">
              <img src={Mpr3} className="rounded-2xl" alt="Home-3-Image" />
              <div className="shadow absolute"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home3;
