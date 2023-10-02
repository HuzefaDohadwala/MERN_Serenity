const mongoose = require("mongoose");

const Schema = mongoose.Schema; // referring variable Schema to mongoose.Schema

// Create an object of the Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 30,
  },
  password: { type: String, required: true, minlength: 8 },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  dateJoined: { type: Date, default: Date.now },
  profileType: {
    type: String,
    required: true,
    enum: ["anonymous", "identified"],
    default: "anonymous", // Set the default value to "anonymous"
  },

  role: {
    type: String,
    required: true,
    enum: ["member", "listener", "therapist"],
    default: "member", // Set the default value to "member"
  },
  therapySessionsBooked: {
    type: [{ type: Schema.Types.ObjectId, ref: "Sessions" }],
    default: [], // Set the default value to an empty array
  },
  lastLogin: {
    type: Date,
    default: function () {
      return this.dateJoined; // Set the default value to dateJoined
    },
  },
});

module.exports = mongoose.model("User", userSchema); // The name of the collection will be the plural of the User here and will be in lowercase.
