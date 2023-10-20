import React, { useState, useEffect, useContext } from "react";
import "./Explore.css";
import axios from "axios";
import { UserContext } from "../../../UserContext";

const MemExplore = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isBrowseClicked, setBrowseClicked] = useState(false);
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    time: "",
    username: user.user.username,
    email: user.user.email,
    company: "",
    topic: "",
  });

  const handleEventSelect = (event) => {
    setSelectedEvent(event); // Set the selected event

    setFormData((prevFormData) => ({
      ...prevFormData,
      company: event.company,
      topic: event.topic,
    }));
  };

  // Helper function to get the API endpoint based on event properties
  const getApiEndpoint = (event) => {
    if (event) {
      if (event.company === "MindfulWellness") {
        return "https://api.apispreadsheets.com/data/DPASwoFmLyBXwDUW/";
      } else if (event.company === "SereneMinds, Inc.") {
        return "https://api.apispreadsheets.com/data/3K3kl7bqF8j1WHWN/";
      }
      // Add more conditions for other events
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentTime = new Date().toISOString().slice(0, 19).replace("T", " ");
    setFormData((prevFormData) => ({
      ...prevFormData,
      time: currentTime,
    }));

    const apiEndpoint = getApiEndpoint(selectedEvent);

    if (apiEndpoint) {
      fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            time: currentTime,
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
          return res.json(); // Parse the response as JSON
        })
        .then((data) => {
          // Handle the JSON response data
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error("No API endpoint found for the selected event.");
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/events");
        const data = response.data.map((event) => ({
          ...event,
          date: event.date.split("T")[0],
        }));
        setEvents(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div style={{ height: "100%", overflowY: "auto" }}>
      {events.map((event) => (
        <div
          key={event._id}
          className="bg-[#7e506c] p-4 rounded-lg shadow-lg m-4 max-w-screen flex"
          onClick={() => handleEventSelect(event)}
        >
          <div className="flex-shrink-0 pt-8">
            <img
              src="https://plus.unsplash.com/premium_photo-1687777667433-601b1449f2a3?auto=format&fit=crop&q=80&w=1374&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Card Image"
              className="h-24 w-24 rounded-full"
            />
          </div>
          <div className="ml-4 flex-grow">
            <h2 className="text-2xl font-bold text-white">{event.company}</h2>
            <p className=" text-left font-semibold text-white pt-4">
              {event.topic}
            </p>
            <p className=" text-left font-semibold text-white">{event.date}</p>
            <p className=" text-left font-semibold text-white">
              {event.location}
            </p>
            <div className="mt-4 text-right">
              <div>
                <form onSubmit={handleSubmit} className="">
                  <div>
                    <label htmlFor="time" className="sr-only"></label>
                    <input
                      type="text"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={(e) =>
                        setFormData({ ...formData, time: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="username" className="sr-only"></label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="sr-only"></label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <button
                      onClick={handleSubmit}
                      type="submit"
                      className="bg-gradient-to-r from-[#d96a94] to-[#b8a8c4] text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300 hover:bg-gradient-to-r hover:from-[#b8a8c4] hover:to-[#d96a94] transform hover:scale-105"
                    >
                      Register
                    </button>
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

export default MemExplore;
