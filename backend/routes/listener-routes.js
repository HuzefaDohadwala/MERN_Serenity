const express = require("express");
const { listenerSignup, listenerLogin } = require("../controllers/listener-controller");

const router = express.Router();

router.post("/signup", listenerSignup);

router.post("/login", listenerLogin)

module.exports = router;
