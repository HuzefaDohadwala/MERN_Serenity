// require user model
const User = require("../models/User");
// require bcrypt
const bcrypt = require("bcryptjs");
const Listener = require("../models/Listener");

// create a singup controller
const signup = async (req, res) => {
  try {
    console.log("Signup controller called...");
    console.log("");
    // get the user input
    const { username, password, email, profileType } = req.body;
    // check if the user exists in the database
    // check precisely whether the username exists or emaile exists and send logs accordingly
    console.log(`Checking if user exists...`);
    console.log("");

    const user = await User.findOne({ username, email });

    // if the user exists, send an error message
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    // create a new user
    // log creating new user msg
    console.log("Creating a new user...");
    console.log("");

    const newUser = new User({ username, password, email, profileType });
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // set the password to the hashed password
    newUser.password = hashedPassword;
    // save the user to the database
    await newUser.save();
    // log user saved msg
    console.log("User saved!");
    //leave a blank line
    console.log("");
    // send a success message
    res.status(201).json({ msg: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const login = async (req, res, next) => {
  try {
    //log
    console.log("Login controller called...");

    //get the user input
    const { email, password } = req.body;

    //log
    console.log("Checking if user exists...");
    //check if the user exists in the database
    const existingUser = await User.findOne({ email });
    //if the user doesn't exist, send an error message
    if (!existingUser) {
      return res.status(400).json({ msg: "User does not exist" });
    } else {
      console.log("User exists");
    }

    //log
    console.log("Checking if password is correct...");
    //check if the password is correct
    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    //if the password is incorrect, send an error message
    if (!passwordCorrect) {
      return res.status(400).json({ msg: "Invalid credentials" });
    } else {
      console.log("Password is correct");
    }

    // log the user in
    //log
    console.log("Logging in...");

    //if login is successfull, send a success message
    res.status(200).json({ msg: "Login successful", user: existingUser });
    //login successful
    console.log("Login successful");
  } catch (error) {
    // catch the error
    res.status(500).json({ msg: error.message });
  }
};


exports.signup = signup; // Export the signup controller
exports.login = login; // Export the login controller

