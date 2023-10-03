import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";

const ListLogin = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    listenerPassword: "",
  });
  const [loading, setLoading] = useState(false);
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
      const res = await axios.post("http://localhost:5000/listener/login", inputs);
      console.log(res);
      console.log("Setting listener in state");
      console.log(res.data);
      navigate("/listener/landing", { state: { user: res.data } });
    } catch (err) {
      console.log(err);
      setError(err.response.data.msg);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Listener Login
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <TextField
          name="email"
          type="email"
          label="Email"
          variant="outlined"
          margin="normal"
          value={inputs.email}
          onChange={handleChange}
          required
        />
        <TextField
          name="listenerPassword"
          type="password"
          label="Password"
          variant="outlined"
          margin="normal"
          value={inputs.listenerPassword}
          onChange={handleChange}
          required
        />
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ mt: 3, mb: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : "Login"}
        </Button>
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ListLogin;
