const mongoose = require('mongoose');

const therapistSchema = new mongoose.Schema({
    therapistName: {
        type: String,
        required: true
    },
    therapistPassword: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    yearsOfExperience: {
        type: Number,
        required: true
    },
    universityName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Therapist', therapistSchema);
