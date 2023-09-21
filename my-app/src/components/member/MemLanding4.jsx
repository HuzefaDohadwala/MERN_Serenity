import React from "react";
import "./MemLanding4.css";
import img_mem4 from "./img_mem4.jpg";

const MemLanding4 = () => {
  return (
    <div className="ml4_container">
      <div className="circle_adi circle3_adi"></div>
      <div className="circle_adi circle1_adi"></div>
      <div className="circle_adi circle2_adi"></div>
      <div className="ml4_left">
        <div className="ml4_image">
          <img src={img_mem4} className="rounded-2xl" alt="Home-3-Image" />
          <div className="shadow absolute"></div>
        </div>
      </div>
      <div className="ml4_right">
        <div className="ml4_title">
          <h1>Posts</h1>
        </div>
        <div className="ml4_text">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, cum!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            rerum eum voluptate?
          </p>
        </div>
        <div className="mem4_btn">
          <button>See Posts</button>
        </div>
      </div>
    </div>
  );
};

export default MemLanding4;
