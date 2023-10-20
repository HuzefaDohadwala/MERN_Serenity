import React from "react";
import therapistsList from "./TherapistsList.json";
import "./MemTherapists.css";
import { useState } from "react";

const MemTherapists = () => {
  const [isBooking, setIsBooking] = useState(false);
  return (
    <div style={{ height: "100%", overflowY: "auto" }}>
      {therapistsList.map((therapist) => (
        <div
          className="bg-[#7e506c] p-4 rounded-lg shadow-lg m-4 max-w-screen flex"
          key={therapist.id}
        >
          <div className="TherapistCard">
            <h1 className="text-2xl font-bold mb-2 text-white pb-2">
              {therapist.name}
            </h1>
            <div className="card_Top flex">
              <div className="card_topLeft">
                <img
                  src={therapist.image}
                  alt="therapistImg"
                  className="Img_border h-24 w-24 rounded-full"
                />
              </div>
              <div className="card_topRight mx-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="charges_tm px-2 py-1 font-semibold">
                    <p>{therapist.charges}</p>
                  </div>
                  <div className="specs_tm px-2 py-1 font-semibold">
                    <p>{therapist.specialization}</p>
                  </div>
                  <div className="langs_tm px-2 py-1 font-semibold">
                    <p>{therapist.languages.join(", ")}</p>
                  </div>
                </div>
                <div className="exp_tm w-1/2 mt-4 px-2 py-1 font-semibold">
                  <p>{therapist.experience}</p>
                </div>
              </div>
            </div>
            <div className="desc_tm text-white pt-4 font-semibold">
              <p>{therapist.description}</p>
            </div>
            <div className="mt-4 text-right">
              <button className=" bg-gradient-to-r from-[#d96a94] to-[#b8a8c4] text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300 hover:bg-gradient-to-r hover:from-[#b8a8c4] hover:to-[#d96a94] transform hover:scale-105">
                Book Session
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemTherapists;
