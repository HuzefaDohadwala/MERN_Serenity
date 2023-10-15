const express = require("express");
const { getMessages } = require("../controllers/api-controller");

const router = express.Router();

router.get(`/messages/:roomName`, getMessages);

module.exports = router;
