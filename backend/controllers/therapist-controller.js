const bcrypt = require("bcryptjs");
const Therapist = require("../models/Therapist");

const therapistSignup = async (req, res) => {
  try {
    const {
      therapistName,
      therapistPassword,
      email,
      phoneNumber,
      country,
      state,
      yearsOfExperience,
      universityName,
    } = req.body; // add phoneNumber to the destructuring assignment
    if (
      !therapistName ||
      !therapistPassword ||
      !email ||
      !phoneNumber ||
      !country ||
      !state ||
      !yearsOfExperience ||
      !universityName
    ) {
      // check if phoneNumber is present
      return res.status(400).json({ msg: "Invalid request body" });
    }
    const user = await Therapist.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "Therapist already exists" });
    }

    //log creating new user listener
    console.log("Creating a new user therapist...");
    const newUser = new Therapist({
      therapistName,
      therapistPassword,
      email,
      phoneNumber,
      country,
      state,
      yearsOfExperience,
      universityName,
    });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(therapistPassword, salt);
    newUser.therapistPassword = hashedPassword;
    await newUser.save();
    //log listener saved msg
    console.log("Therapist saved!");
    console.log(newUser);
    res
      .status(201)
      .json({ msg: "Therapist created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const therapistLogin = async (req, res) => {
  //log login controller called
  console.log("Login controller called...");
  try {
    const { email, therapistPassword } = req.body;
    if (!email || !therapistPassword) {
      return res.status(400).json({ msg: "Invalid request body" });
    }
    const user = await Therapist.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Therapist does not exist" });
    }
    const isMatch = await bcrypt.compare(
      therapistPassword,
      user.therapistPassword
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

module.exports = { therapistSignup, therapistLogin };
