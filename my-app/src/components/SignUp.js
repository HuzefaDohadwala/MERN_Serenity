import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // post details on /signup route
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/signup", inputs);
      console.log(res);
      navigate("/login");
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
        className=" h-90 flex my-24 mx-80 absolute bg-white bg-opacity-20 p-4 rounded-lg shadow-2xl backdrop-blur-md"
        style={{ width: "650px" }}
      >
        <div
          className="w-1/3 pt-28 content-center bg-gradient-to-r from-[#d96a94] to-[#b8a8c4] rounded-lg"
          style={{ width: "250px" }}
        >
          <h2 className="text-4xl font-bold">Welcome !!</h2>
          <h2 className="text-4xl font-bold">Member</h2>
        </div>
        <div className="w-2/3 p-4">
          <Box
            marginLeft="auto"
            marginRight="auto"
            width={300}
            display="flex"
            flexDirection={"column"}
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h2">Signup</Typography>
            <TextField
              name="username"
              onChange={handleChange}
              value={inputs.username}
              variant="outlined"
              placeholder="Username"
              margin="normal"
              className="w-full p-4 m-2 border rounded-md border-gray-300 focus:ring focus:border-purple-300 focus:outline-none transition-transform transform-gpu hover:scale-105 hover:translate-y-1"
            />
            <TextField
              name="email"
              onChange={handleChange}
              type={"email"}
              value={inputs.email}
              variant="outlined"
              placeholder="Email"
              margin="normal"
              className="w-full p-4 m-2 border rounded-md border-gray-300 focus:ring focus:border-purple-300 focus:outline-none transition-transform transform-gpu hover:scale-105 hover:translate-y-1"
            />
            <TextField
              name="password"
              onChange={handleChange}
              type="password"
              value={inputs.password}
              variant="outlined"
              placeholder="Password"
              margin="normal"
              className="w-full p-4 m-2 border rounded-md border-gray-300 focus:ring focus:border-purple-300 focus:outline-none transition-transform transform-gpu hover:scale-105 hover:translate-y-1"
            />
            <Button
              variant="contained"
              type="submit"
              style={{ marginTop: "10px" }}
              className="w-full bg-gradient-to-r from-[#d96a94] to-[#b8a8c4] text-white font-semibold m-2 p-4 rounded-md focus:outline-none transition-transform transform-gpu hover:scale-105 hover:translate-y-1 "
            >
              Signup
            </Button>
            {error && <Typography color="error">{error}</Typography>}
          </Box>
        </div>
      </form>
    </div>
  );
};

export default Signup;
