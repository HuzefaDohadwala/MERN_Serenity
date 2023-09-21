import React from "react";
import "./MemLanding3.css";
import img_mem3 from "./img_mem3.jpg";

const MemLanding3 = () => {
  return (
    <div className="ml3_container">
      <div className="circle-home2 circle1-home2"></div>
      <div className="circle-home2 circle2-home2"></div>
      <div className="circle-home2 circle3-home2"></div>
      <div className="ml3_left">
        <div className="ml3_title">
          <h1>See Explore</h1>
        </div>
        <div className="ml3_text">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
            fuga?
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis quod
            autem voluptas?
          </p>
        </div>
        <div className="mem3_btn">
          <button>See Explore</button>
        </div>
      </div>
      <div className="ml3_right">
        <div className="ml3_image">
          <img src={img_mem3} className="rounded-2xl" alt="Home-3-Image" />
          <div className="shadow1 absolute"></div>
        </div>
      </div>
    </div>
  );
};

export default MemLanding3;
