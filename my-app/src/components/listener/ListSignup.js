import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import Ocr from "../member/pages/Ocr";

const ListenerSignup = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    listenerUsername: "",
    email: "",
    phoneNumber: "",
    listenerPassword: "",
  });
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // post details on /listener/signup route
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    try {
      const res = await axios.post(
        "http://localhost:5000/listener/signup",
        inputs
      );
      console.log(res);
      navigate("/listener/login");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message); // set error message from server response
    }
  };

  return (
    <div className="min-h-screen relative bg-[#E6E6FA]">
      <div className="absolute bg-purple-300 rounded-full w-96 h-96 top-1 left-1 transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bg-purple-300 rounded-full w-96 h-96 bottom-1 right-1 transform -translate-x-1 -translate-y-1.5"></div>

      <form
        onSubmit={handleSubmit}
        className=" h-90 flex  my-24 mx-40 absolute bg-white bg-opacity-20 p-4 rounded-lg shadow-2xl backdrop-blur-md"
      >
        <div className="w-1/3 pt-28 content-center bg-gradient-to-r from-[#d96a94] to-[#b8a8c4] rounded-lg">
          <h2 className="text-5xl font-bold">Welcome !!</h2>
          <h2 className="text-5xl font-bold">Listener</h2>
        </div>
        <div className="w-2/3 p-4">
          <input
            type="text"
            name="listenerUsername"
            onChange={handleChange}
            value={inputs.listenerUsername}
            placeholder="Username"
            className="w-full p-4 m-2 border rounded-md border-gray-300 focus:ring focus:border-purple-300 focus:outline-none transition-transform transform-gpu hover:scale-105 hover:translate-y-1"
          />

          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={inputs.email}
            placeholder="Email"
            className="w-full p-4 m-2 border rounded-md border-gray-300 focus:ring focus:border-purple-300 focus:outline-none transition-transform transform-gpu hover:scale-105 hover:translate-y-1"
          />

          <input
            type="text"
            name="phoneNumber"
            onChange={handleChange}
            value={inputs.phoneNumber}
            placeholder="Phone Number"
            className="w-full p-4 m-2 border rounded-md border-gray-300 focus:ring focus:border-purple-300 focus:outline-none transition-transform transform-gpu hover:scale-105 hover:translate-y-1"
          />

          <input
            type="password"
            name="listenerPassword"
            onChange={handleChange}
            value={inputs.listenerPassword}
            placeholder="Password"
            className="w-full p-4 m-2 border rounded-md border-gray-300 focus:ring focus:border-purple-300 focus:outline-none transition-transform transform-gpu hover:scale-105 hover:translate-y-1"
          />

          <Ocr />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#d96a94] to-[#b8a8c4] text-white font-semibold m-2 p-4 rounded-md focus:outline-none transition-transform transform-gpu hover:scale-105 hover:translate-y-1 "
          >
            Signup
          </button>
          {error && <div className="text-red-500">{error}</div>}
          <Typography variant="p">
            Already have an account?{" "}
            <Link to="/listener/login" style={{ color: "#d96a94" }}>
              Login
            </Link>
          </Typography>
        </div>
      </form>
    </div>
  );
};

export default ListenerSignup;
