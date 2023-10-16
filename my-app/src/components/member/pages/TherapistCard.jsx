import React from "react";
import MemTherapists from "./MemTherapists";

const TherapistCard = (therapist) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{therapist.name}</h3>
      </div>
      <div className="card-body">
        <p>
          <strong>Specialization:</strong> {therapist.specialization.join(", ")}
        </p>
        <p>
          <strong>Languages:</strong> {therapist.languages.join(", ")}
        </p>
        <p>
          <strong>Experience:</strong> {therapist.experience}
        </p>
        <p>{therapist.description}</p>
      </div>
    </div>
  );
};

export default TherapistCard;
