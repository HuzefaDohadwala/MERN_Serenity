const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { get, ConnectionStates } = require('mongoose');
const JWT_SECRET_KEY = "MyKey";
const JWT_REFRESH_SECRET_KEY = 'MyRefreshKey'; // Replace with your refresh token secret key
const JWT_REFRESH_EXPIRATION = '7d'; // Set the refresh token expiration time (e.g., 7 days)


const signup = async (req, res, next) => {

  console.log("Signp Function executed!!");
  // destructure the req.body
  const { username, email, password } = req.body;
  let existingUserByEmail;
  let existingUserByUsername;

  try {
    existingUserByEmail = await User.findOne({ email: email });
    existingUserByUsername = await User.findOne({ username: username });

    if (existingUserByEmail) {
      console.log("User with this email already exists");
      return res.status(400).json({ message: "User with this email already exists" });
    }

    if (existingUserByUsername) {
      console.log("Username is already taken");
      return res.status(400).json({ message: "Username is already taken" });
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    // save the data to Database
    await user.save();
    console.log("User saved successfully!!");
    console.log(user);
    // Once successfully saved, return a success message
    return res.status(201).json({ message: user });
  
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "An error occurred" });
  }
};


// GPT Corrected Code ->
// const login = async (req, res, next) => {
//   console.log("Login Function Executed!!");
//   const { email, password } = req.body;

//   let existingUser;
//   try {
//     existingUser = await User.findOne({ email: email });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: "An error occurred" });
//   }

//   if (!existingUser) {
//     return res.status(400).json({ message: "User not Found, Please Sign-In" });
//   }

//   // Compare the og password with our existinguser.password using bcrypt sync
//   const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
//   if (!isPasswordCorrect) {
//     return res.status(400).json({ message: "Invalid password" });
//   }

//   console.log("Signing Token!!");
//   console.log(existingUser._id);
//   try {
//     // Generate token after the password is correct
//     const token = jwt.sign({ id: existingUser._id }, JWT_SECRET_KEY, {
//       expiresIn: "1hr",
//     });

//     console.log("Token Generated!");
//     console.log(token);

//     // Set the authorization header in the response
//     console.log("Setting the header!")
    
//     res.setHeader('Authorization', `Bearer ${token}`);


//     // VErify Token Immediately
//     jwt.verify(String(token), JWT_SECRET_KEY, (err, user) => {
//       if (err) {
//         console.error("Token Verification Error:", err);
//         return res.status(400).json({ message: "Invalid Token" });
//       }
//       console.log("Token Verified Successfully!");
//       console.log(user.id);
//     });

//     res.clearCookie(String(existingUser.id));

//     // Cookie Parser
//     console.log("Setting Cookie!")
//     res.cookie(String(existingUser.id), token, {
//       path: "/",
//       expires: new Date(Date.now() + 1000 * 60 * 60),
//       httpOnly: true,
//       sameSite: 'lax'
//     });

//     console.log("Finished Setting Cookie!");
//     console.log("User from Login side : \n", existingUser);
//     return res.status(200).json({
//       message: "Successfully Logged In",
//       existingUser,
//       token,
//     });
//   } catch (tokenError) {
//     console.error(tokenError); // Log token generation error
//     return res.status(500).json({ message: "Token generation error" });
//   }
// };

// Function to generate a refresh token
const generateRefreshToken = () => {
  return jwt.sign({}, JWT_REFRESH_SECRET_KEY, { expiresIn: JWT_REFRESH_EXPIRATION });
};




const login = async (req, res, next) => {
  console.log("Login Function Executed!!");
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "An error occurred" });
  }

  if (!existingUser) {
    return res.status(400).json({ message: "User not Found, Please Sign-In" });
  }

  // Compare the original password with our existingUser.password using bcrypt sync
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid password" });
  }

  console.log("Signing Token!!");
  console.log(existingUser._id);
  try {
    // Generate tokens after the password is correct
    const accessToken = jwt.sign({ id: existingUser._id }, JWT_SECRET_KEY, {
      expiresIn: "10s", // Set the access token expiration to 10 seconds
    });

    // Generate a refresh token
    const refreshToken = jwt.sign({}, JWT_REFRESH_SECRET_KEY, {
      expiresIn: "10s", // Set the refresh token expiration to 10 seconds
    });

    console.log("Tokens Generated!");
    console.log("Access Token:", accessToken);
    console.log("Refresh Token:", refreshToken);

    // Set the authorization header in the response
    res.setHeader('Authorization', `Bearer ${accessToken}`);

    // Set the refresh token as a cookie
    res.cookie('refreshToken', refreshToken, { httpOnly: true });

    // Verify the access token immediately
    jwt.verify(String(accessToken), JWT_SECRET_KEY, (err, user) => {
      if (err) {
        console.error("Access Token Verification Error:", err);
        return res.status(400).json({ message: "Invalid Token" });
      }
      console.log("Access Token Verified Successfully!");
      console.log(user.id);
    });

    // Clear any existing user-specific cookies
    res.clearCookie(String(existingUser.id));

    // Set a user-specific cookie with the access token
    res.cookie(String(existingUser.id), accessToken, {
      path: "/",
      expires: new Date(Date.now() + 10000), // Set the expiration to 10 seconds
      httpOnly: true,
      sameSite: 'lax'
    });

    console.log("Finished Setting Cookies!");
    console.log("User from Login side:\n", existingUser);

    // Return both access and refresh tokens in the response
    return res.status(200).json({
      message: "Successfully Logged In",
      existingUser,
      accessToken,
      refreshToken, // Add the refreshToken to the response
    });
  } catch (tokenError) {
    console.error(tokenError); // Log token generation error
    return res.status(500).json({ message: "Token generation error" });
  }
};





//  Gpt Corrected Code ->
const verifyToken = (req, res, next) => {
  console.log("Verify Token Function Executed!!");
  
  // Get the "Authorization" header from the request
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  // Split the header value to extract the token
  const [bearer, token] = authorizationHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return res.status(401).json({ message: "Invalid Authorization header format" });
  }

  // Now, 'token' variable contains your bearer token, and you can verify it
  console.log("Token:", token);

  jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.error("Token Verification Error:", err); // Log the token verification error
      return res.status(400).json({ message: "Invalid Token" });
    }
    console.log("Token Verified Successfully!");
    console.log(user.id);
    req.id = user.id;
    next();
  });
};



// const getUser = async (req, res, next) => {
//   const userId = req.id;
//   try {
//     const user = await User.findById(userId, "-password");

//     if (!user) {
//       // return res.status(404).json({ message: "User Not Found" });
//       console.log("User not Found")
//     }

//     return res.status(200).json({ user });
//   } catch (err) {
//     console.error(err); // Log the error for debugging
//     // return res.status(500).json({ message: "An error occurred" });
//   }
// };


// const getUser = async (req, res, next) => {
//   const userId = req.id;
//   try {
//     const user = await User.findById(userId, "-password");

//     if (!user) {
//       return res.status(404).json({ message: "User Not Found" });
//     }

//     return res.status(200).json({ user });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "An error occurred" });
//   }
// };

const getUser = async (req, res, next) => {
  const userId = req.id;
  try {
    const user = await User.findById(userId, "-password");

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "An error occurred" });
  }
};


// Function to refresh access tokens using a refresh token
const refreshAccessToken = async (req, res) => {
  console.log("refresh Token function called!")
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token is missing" });
  }

  console.log("Found the refresh Token!!");
  
  try {
    // Verify the refresh token
    console.log(refreshToken);

    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET_KEY);
    console.log("Decoded:", decoded); // Log the entire decoded token
    console.log("Decoded id:", decoded.id);

    console.log("Generating new Access token");
    // If the refresh token is valid, generate a new access token
    const accessToken = jwt.sign({ id: decoded.id }, JWT_SECRET_KEY, {
      expiresIn: "10s",
    });

    console.log("New Access token:", accessToken);

    return res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Error verifying refresh token:", error);
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};


// Export the refreshAccessToken function
exports.refreshAccessToken = refreshAccessToken;




exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;

// exports.refreshToken = refreshToken;