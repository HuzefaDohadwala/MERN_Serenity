import React from "react";
import chat from "./chat.png";
import cosultauion from "./consultation.png";
import loupe from "./loupe.png";
import happy from "./happy.png";
import exit from "./exit.png";

const SideBar = ({ displayComponent }) => {
  return (
    <>
      <div
        className="flex min-h-screen
    min-h-screen "
      >
        {/* First Column (1/4) */}
        <div className="w-1/4 bg-[#E6E6FA] ">
          <div className="relative bg-gradient-to-r from-[#d96a94] to-[#b8a8c4] rounded-full p-5 mt-20 ml-2 w-16 h-16 mb-4">
            <img
              src={chat}
              alt="logo"
              className="about2_icon about2_oppIcon"
              onClick={() => displayComponent("chat")}
            />
          </div>
          <div className="relative bg-gradient-to-r from-[#d96a94] to-[#b8a8c4] rounded-full p-5 ml-2 w-16 h-16 mb-4">
            <img
              src={cosultauion}
              alt="therapist"
              className="about2_icon about2_oppIcon"
              onClick={() => displayComponent("therapist")}
            />
          </div>
          <div className="relative bg-gradient-to-r from-[#d96a94] to-[#b8a8c4] rounded-full p-5 ml-2 w-16 h-16 mb-4">
            <img
              src={loupe}
              alt="explore"
              className="about2_icon about2_oppIcon"
              onClick={() => displayComponent("explore")}
            />
          </div>
          <div className="relative bg-gradient-to-r from-[#d96a94] to-[#b8a8c4] rounded-full p-5 ml-2 w-16 h-16 mb-4">
            <img
              src={happy}
              alt="meme"
              className="about2_icon about2_oppIcon"
              onClick={() => displayComponent("meme")}
            />
          </div>
          <div className="relative bg-gradient-to-r from-[#d96a94] to-[#b8a8c4] rounded-full p-5 ml-2 w-16 h-16 mb-4">
            <img
              src={exit}
              alt="meme"
              className="about2_icon about2_oppIcon"
              onClick={() => displayComponent("meme")}
            />
          </div>
        </div>

        {/* Second Column (3/4) */}
        <div className="w-3/4 bg-yellow-500 ">
          {/* Content for the second column */}
          world
        </div>
      </div>
    </>
  );
};

export default SideBar;
