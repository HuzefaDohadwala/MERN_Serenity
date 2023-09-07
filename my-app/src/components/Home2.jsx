import React from "react";
import "./Home2.css";
import Pick from "./pick.jpg";

const Home2 = () => {
  return (
    <>
      <div className="second-main-home2 w-screen h-screen bg-[#E6E6FA] flex flex-col justify-center items-center relative">
        <div className="circle-home2 circle1-home2"></div>
        <div className="circle-home2 circle2-home2"></div>
        <div className="circle-home2 circle3-home2"></div>

        <div className="content-container-home2 flex justify-center items-center">
          <div className="heading-second-home2 h-2/5 flex flex-col justify-center items-center">
            <h1 className="w-full text-4xl text-[#7E506C] font-semibold mb-2 mt-20">
              Connect with Diverse Listeners Who Share Your Interests!!
            </h1>
            <p className="second-heading-home2 text-base m-4 text-[#A48AA8]">
              Better help is a community that believes access to mental
              healthcare is essential, so we support anyone with a desire to
              grow
            </p>
          </div>
        </div>

        <div className="picture-parent-home2 h-3/5 w-4/5 flex justify-center items-center">
          {/* your picture-related content goes here */}
          <div className="left-container-home2 w-1/2 flex justify-center ">
            <div className="img-container-home2 relative">
              <div className="img-wrapper relative inline-block">
                <img src={Pick} className="rounded-2xl " alt="" />
                <div className="shadow-home2 w-full h-full "></div>
              </div>
            </div>
          </div>
          <div className="right-container-home2 w-1/2 h-3/5 flex justify-center items-start mt-8 ">
            <div className="text-container-home2 ">
              <h1 className="text-3xl text-[#7E506C] font-semibold">
                Pick your person
              </h1>
              <div className="para-holder-home2 flex justify-center">
                <p className="person-para-home2 text-base m-4 text-[#A48AA8] w-1/2 ">
                  Find a special place where you can meet new listeners; pick
                  the ones who understand you the best!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home2;
