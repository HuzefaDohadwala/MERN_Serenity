const express = require("express");
const {
  listenerSignup,
  listenerLogin,
  getListener,
} = require("../controllers/listener-controller");


const router = express.Router();

router.post("/signup", listenerSignup);

router.post("/login", listenerLogin);

router.get("/getListener/:senderId", getListener);


module.exports = router;
