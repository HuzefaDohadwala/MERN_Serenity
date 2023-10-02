const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listenerSchema = new Schema({
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Therapist",
  },
  rating: { type: Number, min: 0, max: 5 },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  listenerUsername: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 30,
  },
  listenerPassword: { type: String, required: true, minlength: 8 },
  dateJoined: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Listener", listenerSchema);
