const mongoose = require('mongoose');

const Schema = mongoose.Schema; // referring variable Schema to mongoose.Schema


// Create an object of the Schema
const userSchema = new Schema({
    "username": { type: String, required: true, unique: true, minlength: 3, maxlength: 30 },
    "password": { type: String, required: true, minlength: 8 },
    "email": { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    "dateJoined": { type: Date, default: Date.now },
})

module.exports = mongoose.model("User", userSchema);// The name of the collection will be the plural of the User here and will be in lowercase.