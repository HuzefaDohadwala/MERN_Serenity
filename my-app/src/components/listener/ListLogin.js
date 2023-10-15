import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../UserContext";
import { useContext } from "react";

const ListLogin = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    listenerPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext); // Use the setUser function from the UserContext
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
      const res = await axios.post(
        "http://localhost:5000/listener/login",
        inputs
      );
      console.log(res);
      console.log("Setting listener in state");
      console.log(res.data);
      setUser(res.data); // Set the user state using the setUser function from the UserContext
      navigate("/listener/landing");
    } catch (err) {
      console.log(err);
      setError(err.response.data.msg);
    }
  };
  return (
<div className="min-h-screen relative bg-[#E6E6FA]">
    <div className="absolute bg-purple-300 rounded-full w-96 h-96 top-1 left-1 transform -translate-x-1/2 -translate-y-1/2"></div>
    <div className="absolute bg-purple-300 rounded-full w-96 h-96 bottom-1 right-1 transform -translate-x-1 -translate-y-1.5"></div>
  <form onSubmit={handleSubmit} className=" h-90 flex  my-24 mx-40 absolute bg-white bg-opacity-20 p-4 rounded-lg shadow-2xl backdrop-blur-md">
  <div className="w-1/3 pt-20 content-center bg-gradient-to-r from-[#d96a94] to-[#b8a8c4] rounded-lg">
      <h2 className="text-5xl font-bold">Welcome !!</h2>
      <h2 className="text-5xl font-bold">Listener</h2>
      </div>
      <div className="w-2/3 p-4">
    <input
      name="email"
      type="email"
      placeholder="Email"
      className="w-full p-4 m-2 border rounded-md border-gray-300 focus:ring focus:border-purple-300 focus:outline-none transition-transform transform-gpu hover:scale-105 hover:translate-y-1"
      value={inputs.email}
      onChange={handleChange}
      required
    />
    <input
      name="listenerPassword"
      type="password"
      placeholder="Password"
      className="w-full p-4 m-2 border rounded-md border-gray-300 focus:ring focus:border-purple-300 focus:outline-none transition-transform transform-gpu hover:scale-105 hover:translate-y-1"
      value={inputs.listenerPassword}
      onChange={handleChange}
      required
    />
    <button
      type="submit"
      className="w-full bg-gradient-to-r from-[#d96a94] to-[#b8a8c4] text-white font-semibold m-2 p-4 rounded-md focus:outline-none transition-transform transform-gpu hover:scale-105 hover:translate-y-1"
      disabled={loading}
    >
      {loading ? <div className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-blue-500 rounded-full"></div> : "Login"}
    </button>
    {error && (
      <p className="text-red-500 text-sm">{error}</p>
    )}
    </div>
  </form>
</div>

  );
};

export default ListLogin;
