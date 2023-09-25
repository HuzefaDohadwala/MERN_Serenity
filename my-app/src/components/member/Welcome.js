import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios"; // Import Axios

const Welcome = () => {
  const location = useLocation();
  const { state } = location;
  const [user, setUser] = useState(state ? state.user : null);

  console.log("User:", user);

  // Define a function to refresh the access token
  const handleRefreshToken = async () => {
    try {
      // Access the refresh token from the user object in state
      const refreshToken = user ? user.refreshToken : null;

      if (!refreshToken) {
        console.error("Refresh token not found");
        return;
      }

      // Call the refresh token endpoint directly on the backend using Axios
      const response = await axios.post("http://localhost:5000/refresh-token", { refreshToken }); // Replace with your backend route

      if (response.status === 200) {
        const data = response.data;
        const newAccessToken = data.accessToken;

        // Update the user object with the new access token
        setUser((prevUser) => {
            return {
              ...prevUser,
              accessToken: newAccessToken,
            };
          });
          

        console.log("Access token refreshed successfully");
      } else {
        console.error("Error refreshing access token");
      }
    } catch (error) {
      console.error("Error refreshing access token:", error);
    }
  };

  // Use the useEffect hook to refresh the token when the component mounts
  useEffect(() => {
    handleRefreshToken();
  }, []);

  return (
    <div>
      <h2>Welcome, {user ? user.existingUser.username : "Guest"}!</h2>
      {user ? (
        <div>
          <p>Email: {user.existingUser.email}</p>
        </div>
      ) : (
        <p>Please log in to access your account.</p>
      )}
    </div>
  );
};

export default Welcome;
