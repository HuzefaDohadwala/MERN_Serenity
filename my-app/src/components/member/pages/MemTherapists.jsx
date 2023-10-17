import React from "react";
import therapistsList from "./TherapistsList.json";
import "./MemTherapists.css";

const MemTherapists = () => {
  return (
    <div className="grid grid-cols-3 mt-16">
      {therapistsList.map((therapist) => (
        <div
          className="TC_container bg-gray-200 rounded-lg shadow-lg p-4 mx-24 my-4"
          key={therapist.id}
        >
          <div className="TherapistCard">
            <h1>Name: {therapist.name}</h1>
            <p>Specialization: {therapist.specialization.join(", ")}</p>
            <p>Languages: {therapist.languages.join(", ")}</p>
            <p>Experience: {therapist.experience}</p>
            <button className="TC_btn">Talk Now!</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemTherapists;
