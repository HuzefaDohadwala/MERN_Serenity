import React from "react";
import explore from "./Explore.json";
import "./Explore.css";
import { useState } from "react";

const ListExplore = () => {
  const [formData, setFormData] = useState({
    time: "",
    username: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://api.apispreadsheets.com/data/DPASwoFmLyBXwDUW/", {
      method: "POST",
      body: JSON.stringify({
        data: {
          time: formData.time,
          email: formData.email,
          username: formData.username,
        },
      }),
    })
      .then((res) => {
        if (res.status === 201) {
          // SUCCESS
        } else {
          // ERROR
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div style={{ height: "100%", overflowY: "auto" }}>
      {explore.map((event, index) => (
        <div
          key={index}
          className="bg-[#7e506c] p-4 rounded-lg shadow-lg m-4 max-w-screen flex"
        >
          <div className="flex-shrink-0">
            <img
              src={event.image}
              alt="Card Image"
              className="h-24 w-24 rounded-full"
            />
          </div>
          <div className="ml-4 flex-grow">
            <h2 className="text-2xl font-semibold text-white">{event.name}</h2>
            <p className=" text-left text-white">{event.date}</p>
            <p className=" text-left text-white">{event.location}</p>
            <div className="mt-4 text-right">
              <div>
                <h2>User Form</h2>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="time">Time:</label>
                    <input
                      type="text"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="username">Username:</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <button type="submit">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListExplore;
