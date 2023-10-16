import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";

const Login = () => {
  const history = useNavigate(); // Use useNavigate hook at the component's top-level scope
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { setUser } = useContext(UserContext); // Use the setUser function from the UserContext
  // error state
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Login form submitted");
      console.log("Sending request to /login route");
      const res = await axios.post("http://localhost:5000/login", inputs);
      console.log(res);
      console.log("Setting user in state");
      console.log(res.data);
      setUser(res.data); // Set the user state using the setUser function from the UserContext
      history("/member/landing");
    } catch (err) {
      console.log(err);
      setError(err.response.data.msg);
    }
  };

  return (
    <div className="min-h-screen relative bg-[#E6E6FA]">
      <div className="absolute bg-purple-300 rounded-full w-96 h-96 top-1 left-1 transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bg-purple-300 rounded-full w-96 h-96 bottom-1 right-1 transform -translate-x-1 -translate-y-1.5"></div>
      <form
        onSubmit={handleSubmit}
        className="h-90 flex my-40 mx-80 absolute bg-white bg-opacity-20 p-4 rounded-lg shadow-2xl backdrop-blur-md"
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
            <Typography variant="h2" className="text-4xl font-bold">
              Login
            </Typography>

            <TextField
              name="email"
              onChange={handleChange}
              type={"email"}
              value={inputs.email}
              variant="outlined"
              placeholder="Email"
              margin="normal"
              required
              style={{ backgroundColor: "white" }}
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
              required
              style={{ backgroundColor: "white" }}
              className="w-full p-4 m-2 border rounded-md border-gray-300 focus:ring focus:border-purple-300 focus:outline-none transition-transform transform-gpu hover:scale-105 hover:translate-y-1"
            />
            <Button
              variant="contained"
              type="submit"
              style={{ marginTop: "10px" }}
              className="w-full bg-gradient-to-r from-[#d96a94] to-[#b8a8c4] text-white font-semibold m-2 p-4 rounded-md focus:outline-none transition-transform transform-gpu hover:scale-105 hover:translate-y-1"
            >
              Login
            </Button>
            {error && (
              <Typography color="error" className="text-red-500 text-sm">
                {error}
              </Typography>
            )}
          </Box>
        </div>
      </form>
    </div>
  );
};

export default Login;
