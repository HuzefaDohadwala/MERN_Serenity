import React from "react";
import "./Home1.css";
import home1_image from "./home1_image.jpg";
import helping from "./helping.png";
import empathy from "./empathy.png";
import padlock from "./padlock.png";
import clock from "./clock.png";
import { Link } from "react-router-dom";

const Home1 = () => {
  const rows = [
    {
      src: helping, // Updated the src field
      alt: "Helping",
      text: "Instant Connection, Genuine Support",
    },
    {
      src: empathy, // Updated the src field
      alt: "Empathy",
      text: "Empathetic Listening, Kind Hearts",
    },
    {
      src: padlock, // Updated the src field
      alt: "Secure",
      text: "Your Privacy is Our Priority",
    },
    {
      src: clock, // Updated the src field
      alt: "Time",
      text: "Compassionate Companions, Always Available",
    },
  ];
  const onButtonClick = () => {
    console.log("The button was clicked!");
    // You can add any other logic you want here
  };

  return (
    <>
      <div className="home1">
        <div className="heading">
          <h1>Embrace empathy,</h1>
          <h1>Find your listener</h1>
        </div>
        <div className="home1_semic11"></div>
        <div className="home1_semic12"></div>
        <img src={home1_image} alt="logo" className="home1_image" />
        <table className="custom-table">
          <tbody>
            {rows.map((row, index) => (
              <tr className="tableRow_home1" key={index}>
                <td className="image-cell">
                  <img src={row.src} alt={row.alt} className="table-image" />
                </td>
                <td>{row.text}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="customButton" onClick={onButtonClick}>
          <Link to="/login">Find a listener</Link>
        </button>
        <button className="customButton w-44">
          <Link to="/chatbot">BetterHelpAI</Link>
        </button>
      </div>
    </>
  );
};

export default Home1;
