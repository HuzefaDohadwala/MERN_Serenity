import React from "react";
import explore from './Explore.json';
import './Explore.css'

const MemExplore = () => {
  return (
    <div style={{ height: "100%", overflowY: "auto" }}>
    {explore.map((event, index) => (
      <div key={index} className="bg-[#7e506c] p-4 rounded-lg shadow-lg m-4 max-w-screen flex">
        <div className="flex-shrink-0">
          <img src={event.image} alt="Card Image" className="h-24 w-24 rounded-full" />
        </div>
        <div className="ml-4 flex-grow">
          <h2 className="text-2xl font-semibold text-white">{event.name}</h2>
          <p className=" text-left text-white">{event.date}</p>
          <p className=" text-left text-white">{event.location}</p>
          <div className="mt-4 text-right">
            <button className="bg-gradient-to-r from-[#d96a94] to-[#b8a8c4] text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300 hover:bg-gradient-to-r hover:from-[#b8a8c4] hover:to-[#d96a94] transform hover:scale-105">
              Register
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
  

  );
};

export default MemExplore;
