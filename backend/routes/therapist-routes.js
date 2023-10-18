const express = require("express");

const {
  therapistSignup,
  therapistLogin,

} = require("../controllers/therapist-controller");

const router = express.Router();

router.post("/signup", therapistSignup);
router.post("/login", therapistLogin);

module.exports = router;
