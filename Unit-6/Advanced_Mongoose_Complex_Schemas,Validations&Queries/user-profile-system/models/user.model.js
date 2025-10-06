const mongoose = require('mongoose');
const validator = require('validator');

const profileSchema = new mongoose.Schema({
    profileName: {
        type: String,
        required: [true, "Profile name is required"],
        enum: {
            values: ["fb", "twitter", "github", "instagram"],
            message: "{VALUE} is not a valid profile name"
        }
    },
    url: {
        type: String,
        required: [true, "Profile URL is required"],
        validate: {
            validator: validator.isURL,
            message: "Invalid URL format"
        }
    }
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name is required"] },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: [6, "Password must be at least 6 characters"] },
    profiles: [profileSchema]
});

const User = mongoose.model('User', userSchema);
module.exports = User;