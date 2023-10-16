const bcrypt = require("bcryptjs");
const Listener = require("../models/Listener");

const listenerSignup = async (req, res) => {
  try {
    const { listenerUsername, listenerPassword, email } = req.body;
    if (!listenerUsername || !listenerPassword || !email) {
      return res.status(400).json({ msg: "Invalid request body" });
    }
    const user = await Listener.findOne({ listenerUsername, email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    //log creating new user listener
    console.log("Creating a new user listener...");
    const newUser = new Listener({
      listenerUsername,
      listenerPassword,
      email,
    });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(listenerPassword, salt);
    newUser.listenerPassword = hashedPassword;
    await newUser.save();
    //log listener saved msg
    console.log("Listener saved!");
    console.log(newUser);
    res
      .status(201)
      .json({ msg: "Listener created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getListener = async (req, res) => {
  try {
    const listener = await Listener.findById(req.params.id);
    if (!listener) {
      return res.status(404).json({ msg: "Listener not found" });
    }
    res.status(200).json(listener);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const listenerLogin = async (req, res) => {
  //log login controller called
  console.log("Login controller called...");
  try {
    const { email, listenerPassword } = req.body;
    if (!email || !listenerPassword) {
      return res.status(400).json({ msg: "Invalid request body" });
    }
    const user = await Listener.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Listener does not exist" });
    }
    const isMatch = await bcrypt.compare(
      listenerPassword,
      user.listenerPassword
    );
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    //log login successful
    console.log("Login successful!");
    res.status(200).json({ msg: "Login successful", user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { listenerSignup, listenerLogin, getListener };
