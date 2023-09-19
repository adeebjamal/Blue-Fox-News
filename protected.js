require("dotenv").config();

module.exports = {
    mongoDB_atlas_url: process.env.mongoDB_atlas_url,
    SECRET_KEY: process.env.SECRET_KEY,
    emailAddress: process.env.emailAddress,
    password: process.env.password,
    Guardian_API_KEY: process.env.Guardian_API_KEY
}