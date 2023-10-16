import React from "react";
import explore from './Explore.json';

const MemExplore = () => {
  return (
    <div style={{ height: "100%", overflowY: "auto" }}>
      {explore.map((event, index) => (
        <div key={index} className="bg-gray-900 p-4 rounded-lg shadow-lg m-4 max-w-screen flex">
          <div className="flex-shrink-0">
            <img src={event.image} alt="Card Image" className="h-24 w-24 rounded-full" />
          </div>
          <div className="ml-4 flex-grow">
            <h2 className="text-2xl font-semibold text-white">{event.name}</h2>
            <p className="text-gray-400">{event.date}</p>
            <p className="text-gray-400">{event.location}</p>
            <div className="mt-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300">
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
