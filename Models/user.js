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
    topic1: {
        type: String,
    },
    topic2: {
        type: String,
    }
});

module.exports = new mongoose.model("User",userSchema);