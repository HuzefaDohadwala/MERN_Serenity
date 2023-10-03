const express = require("express");
const {
  signup,
  login,
  verifyToken,
  getUser,
  refreshAccessToken,
  listenerSignup,
} = require("../controllers/user-controller"); // Import the new middleware

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/api/user", getUser);

module.exports = router;
