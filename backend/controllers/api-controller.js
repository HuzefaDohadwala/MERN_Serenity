const Message = require("../models/Message");

const getMessages = async (req, res) => {
  const roomName = req.params.roomName;

  // Find all messages for the given room name
  Message.find({ roomName: roomName })
    .sort({ timestamp: 1 })
    .exec()
    .then((messages) => {
      // console.log("Messages:", messages);
      res.status(200).json(messages);
    })
    .catch((error) => {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Error fetching messages" });
    });
};

module.exports = { getMessages };
