import React from "react";
import "./Home2.css";
import Pick from "./pick.jpg";

const Home2 = () => {
  return (
    <>
      {/* <div className="home2">
    <div className="heading_home2">
          <h1>Connect with Diverse Listeners </h1>
          <h1>Who Share Your Interests!!</h1>
      </div>
    <div className="text_home2">
            <p>Better help is a community that believes access to mental</p>
            <p>healthcare is essential, so we support anyone with a desire to grow</p>
    </div>
    <div className="heading2_home2">
          <h1>Pick your person </h1>
      </div>
    <div className="text2_home2">
            <p>Find a special place where you can meet</p>
            <p>new listeners; pick the ones who </p>
            <p>understand you the best!</p>
    </div>
    </div> */}

      <div className="second-main w-screen h-screen bg-[#E6E6FA] flex flex-col justify-center items-center relative">
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        <div className="circle circle3"></div>

        <div className="content-container flex justify-center items-center">
          <div className="heading-second h-2/5 flex flex-col justify-center items-center">
            <h1 className="w-full text-4xl text-[#7E506C] font-semibold mb-2 mt-20">
              Connect with Diverse Listeners Who Share Your Interests!!
            </h1>
            <p className="second-heading text-base m-4 text-[#A48AA8]">
              Better help is a community that believes access to mental
              healthcare is essential, so we support anyone with a desire to
              grow
            </p>
          </div>
        </div>

        <div className="picture-parent h-3/5 w-4/5 flex justify-center items-center">
          {/* your picture-related content goes here */}
          <div className="left-container w-1/2 flex justify-center ">
            <div className="img-container ">
              <img src={Pick} className="rounded-2xl " alt="" />
              <div className="shadow"></div>
            </div>
          </div>
          <div className="right-container w-1/2 h-3/5 flex justify-center items-start mt-8 ">
            <div className="text-container ">
              <h1 className="text-3xl text-[#7E506C] font-semibold">
                Pick your person
              </h1>
              <div className="para-holder flex justify-center">
                <p className="person-para text-base m-4 text-[#A48AA8] w-1/2 ">
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
