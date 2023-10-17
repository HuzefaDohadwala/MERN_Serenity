import React from "react";
import therapistsList from "./TherapistsList.json";
import "./MemTherapists.css";

const MemTherapists = () => {
  return (
    <div>
      {therapistsList.map((therapist) => (
        <div
          className="TC_container w-1/2 bg-gray-200 rounded-lg shadow-lg p-4 mx-96 my-4"
          key={therapist.id}
        >
          <div className="TherapistCard">
            <h1 className="text-xl font-bold mb-2">{therapist.name}</h1>
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
                  <div className="charges_tm px-2 py-1">
                    <p>{therapist.charges}</p>
                  </div>
                  <div className="specs_tm px-2 py-1">
                    <p>{therapist.specialization}</p>
                  </div>
                  <div className="langs_tm px-2 py-1">
                    <p>{therapist.languages.join(", ")}</p>
                  </div>
                </div>
                <div className="exp_tm w-1/2 mt-4 px-2 py-1">
                  <p>{therapist.experience}</p>
                </div>
              </div>
            </div>
            <div className="desc_tm">
              <p>{therapist.description}</p>
            </div>
            <button className="TC_btn">Book Session</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemTherapists;
