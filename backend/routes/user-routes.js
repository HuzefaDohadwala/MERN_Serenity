const express = require("express");
const {
  signup,
  login,
  verifyToken,
  getUser,
  refreshAccessToken,
  listenerSignup,
  getEvents,
} = require("../controllers/user-controller"); // Import the new middleware

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/getUser/:receiverId", getUser);

router.get(`/events`, getEvents);

// router.get("/explore", explore);

module.exports = router;
