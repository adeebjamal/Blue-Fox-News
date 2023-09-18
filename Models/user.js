const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    subscribed: {
        type: Boolean,
        default: true,
        required: true
    },
    topic1: {
        type: String,
        default: "Programming"
    },
    topic2: {
        type: String,
        default: "Sports"
    }
});

module.exports = new mongoose.model("User",userSchema);