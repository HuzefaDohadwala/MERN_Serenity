import React, { useState, useEffect, useContext } from "react";
import "./Explore.css";
import axios from "axios";
import { UserContext } from "../../../UserContext";

const MemExplore = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { user } = useContext(UserContext);
  // console.log(user);
  const [formData, setFormData] = useState({
    time: "",
    username: user.user.username,
    email: user.user.email,
    company: selectedEvent ? selectedEvent.company : "",
    topic: selectedEvent ? selectedEvent.topic : "",
  });

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event._id]: {
        time: "",
        username: user.user.username,
        email: user.user.email,
        company: event.company,
        topic: event.topic,
      },
    }));
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
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, []);

  const handleChange = (e, eventId) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [eventId]: {
        ...prevFormData[eventId],
        [name]: value,
      },
    }));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentTime = new Date().toISOString().slice(0, 19).replace("T", " ");
    setFormData({ ...formData, time: currentTime });
    console.log(formData);
    fetch("https://api.apispreadsheets.com/data/DPASwoFmLyBXwDUW/", {
      method: "POST",
      body: JSON.stringify({
        data: {
          time: currentTime,
          email: formData.email,
          username: formData.username,
          company: formData.company,
          topic: formData.topic,
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
      {events.map((event) => (
        <div
          key={event._id}
          className="bg-[#7e506c] p-4 rounded-lg shadow-lg m-4 max-w-screen flex"
          onClick={() => handleEventSelect(event)}
        >
          <div className="flex-shrink-0">
            <img
              src={event.image}
              alt="Card Image"
              className="h-24 w-24 rounded-full"
            />
          </div>
          <div className="ml-4 flex-grow">
            <h2 className="text-2xl font-semibold text-white">{event.company}</h2>
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
                    <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData[event._id]?.company || ""}
                    onChange={(e) => handleChange(e, event._id)}
                    disabled
                  />
                  </div>
                  <div>
                  <input
                    type="text"
                    id="topic"
                    name="topic"
                    value={formData[event._id]?.topic || ""}
                    onChange={(e) => handleChange(e, event._id)}
                    disabled
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

export default MemExplore;
