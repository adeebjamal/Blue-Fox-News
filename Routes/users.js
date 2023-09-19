const express = require("express");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

const router = express.Router();

// User defined function
function generateOTP() {
    const min = 100000; // Minimum 6-digit number (100000)
    const max = 999999; // Maximum 6-digit number (999999)
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}

const sendOTP = require("../functions/send_otp");

// Importing models
const USER = require("../Models/user");

// Importing secret key
const SECRET_KEY = require("../protected").SECRET_KEY;

// ---------- GET routes ----------
router.get("/login", require("../Middlewares/getLoginMiddleware"), async(req,res)=> {
    res.render("login", {
        message: ""
    });
});

router.get("/register", async(req,res)=> {
    res.render("register", {
        message: ""
    });
});

router.get("/logout", async(req,res)=> {
    // This destroys the saved JWT
    res.clearCookie("JWT_token");
    res.render("login", {
        message: "Logout successful."
    });
});

// ---------- POST routes ----------
router.post("/login", async(req,res)=> {
    try {
        if(!req.body.userEmail || !req.body.userPassword) {
            res.render("login", {
                message: "Please fill all the required fields."
            });
            return;
        }
        const tempUser = await USER.findOne({email: req.body.userEmail});
        if(!tempUser) {
            res.render("login", {
                message: "User with entered details doesn't exists."
            });
            return;
        }
        if(tempUser.password !== md5(req.body.userPassword)) {
            res.render("login", {
                message: "Incorrect password"
            });
            return;
        }
        const jwtToken = jwt.sign({ID: tempUser._id}, SECRET_KEY);
        res.cookie("JWT_token", jwtToken);
        res.render("user-dashboard", {
            name: tempUser.name,
            topic1: tempUser.topic1,
            topic2: tempUser.topic2,
            message: ""
        });
    }
    catch(error) {
        res.send(error);
    }
});

router.post("/register", async(req,res)=> {
    try {
        console.log(req.body);
        if(!req.body.newName || !req.body.newEmail || !req.body.newPassword || !req.body.confirmPassword) {
            res.render("register", {
                message: "Please fill all the required fields."
            });
            return;
        }
        if(req.body.newPassword !== req.body.confirmPassword) {
            res.render("register", {
                message: "Passwords doesn't match."
            });
            return;
        }
        if(req.body.newPassword.length < 6) {
            res.render("register", {
                message: "Password is too weak."
            });
            return;
        }
        const foundUser = await USER.findOne({email: req.body.newEmail});
        if(foundUser) {
            res.render("register", {
                message: "User with entered Email already exists."
            });
            return;
        }
        const newOTP = generateOTP();
        await sendOTP(req.body.newEmail, newOTP.toString());
        console.log("This is the OTP: ", newOTP);
        const newUserJWT = jwt.sign({newUserData: req.body, OTP: newOTP}, SECRET_KEY);
        res.cookie("email_and_OTP", newUserJWT);
        res.render("verify_otp", {
            message: ""
        });
    }
    catch(error) {
        res.send(error);
    }
});

router.post("/OTP", async(req,res)=> {
    try {
        const receivedToken = req.cookies.email_and_OTP;
        if(!receivedToken) {
            res.status(401).json({message: "Something went wrong."});
            return;
        }
        const decodedJWT = jwt.verify(receivedToken, SECRET_KEY);
        if(req.body.newOTP == decodedJWT.OTP) {
            const newUser = decodedJWT.newUserData;
            const createdUser = new USER({
                name: newUser.newName,
                email: newUser.newEmail,
                password: md5(newUser.newPassword),
                topic1: "Programming",
                topic2: "Anime"
            });
            await createdUser.save();
            res.clearCookie("email_and_OTP");
            res.render("login", {
                message: "Registration seccessful. You can login now."
            });
        }
        else {
            res.render("verify_otp", {
                message: "Incorrect OTP."
            });
        }
    }
    catch(error) {
        res.send(error);
    }
});

router.post("/update", async(req,res)=> {
    try {
        const token = req.cookies.JWT_token;
        if(token) {
            const decodedJWT = jwt.verify(token, SECRET_KEY);
            const foundUser = await USER.findOne({_id: decodedJWT.ID});
            if(req.body.preference1) {
                foundUser.topic1 = req.body.preference1;
            }
            if(req.body.preference2) {
                foundUser.topic2 = req.body.preference2;
            }
            await foundUser.save();
            res.render("user-dashboard", {
                name: foundUser.name,
                topic1: foundUser.topic1,
                topic2: foundUser.topic2,
                message: "News preferences updated successfully."
            });
            return;
        }
        else {
            res.render("login", {
                message: "You need to login first."
            });
        }
    }
    catch(error) {
        res.render("login", {
            message: "You need to login first."
        });
        console.log("Something wrong happened.");
    }
});

router.post("/changeSubscriptionStatus", async(req,res) => {
    try {
        const token = req.cookies.JWT_token;
        if(token) {
            const decodedJWT = jwt.verify(token, SECRET_KEY);
            const foundUser = await USER.findOne({_id: decodedJWT.ID});
            foundUser.subscribed = !foundUser.subscribed;
            await foundUser.save();
            res.render("user-dashboard", {
                name: foundUser.name,
                topic1: foundUser.topic1,
                topic2: foundUser.topic2,
                message: "Subscription status changed successfully."
            });
            return;
        }
        else {
            res.render("login", {
                message: "You need to login first."
            });
        }
    }
    catch(error) {
        res.render("login", {
            message: "You need to login first."
        });
        console.log("Something wrong happened.");
    }
});

module.exports = router;