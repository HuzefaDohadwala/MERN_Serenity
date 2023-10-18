const bcrypt = require("bcryptjs");
const Listener = require("../models/Listener");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const SECRET_KEY = "mysecretkey";

const listenerSignup = async (req, res) => {
  try {
    const { listenerUsername, listenerPassword, email, phoneNumber } = req.body; // add phoneNumber to the destructuring assignment
    if (!listenerUsername || !listenerPassword || !email || !phoneNumber) {
      // check if phoneNumber is present
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
      phoneNumber,
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

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    console.log("JWT generated");
    console.log(token);

    // Set JWT as HTTP-only cookie
    res.cookie("jwt", token, { httpOnly: true });

    // Store token in context
    // req.context.token = token;

    res.status(200).json({ msg: "Login successful", user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const verifyToken = (req, res, next) => {
  // Get token from authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, SECRET_KEY);

    // Add decoded payload to request object
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = { listenerSignup, listenerLogin, getListener, verifyToken };
