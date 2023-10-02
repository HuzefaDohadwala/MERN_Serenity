import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ListenerSignup = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        listenerUsername: "",
        email: "",
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
        try {
            const res = await axios.post("http://localhost:5000/listener/signup", inputs);
            console.log(res);
            navigate("/listener/login");
        } catch (err) {
            console.log(err);
            setError(err.response.data.message); // set error message from server response
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box
                    marginLeft="auto"
                    marginRight="auto"
                    width={300}
                    display="flex"
                    flexDirection={"column"}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography variant="h2">Listener Signup</Typography>
                    <TextField
                        name="listenerUsername"
                        onChange={handleChange}
                        value={inputs.listenerUsername}
                        variant="outlined"
                        placeholder="Username"
                        margin="normal"
                    />
                    <TextField
                        name="email"
                        onChange={handleChange}
                        type={"email"}
                        value={inputs.email}
                        variant="outlined"
                        placeholder="Email"
                        margin="normal"
                    />
                    <TextField
                        name="listenerPassword"
                        onChange={handleChange}
                        type="password"
                        value={inputs.listenerPassword}
                        variant="outlined"
                        placeholder="Password"
                        margin="normal"
                    />
                    <Button variant="contained" type="submit">
                        Signup
                    </Button>
                    {error && <Typography color="error">{error}</Typography>}
                </Box>
            </form>
        </div>
    );
};

export default ListenerSignup;