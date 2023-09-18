const jwt = require("jsonwebtoken");

const SECRET_KEY = require("../protected").SECRET_KEY;

const USER = require("../Models/user");

const getLoginMiddleware = async(req,res,next)=> {
    try {
        const token = req.cookies.JWT_token;
        if(token) {
            const decodedJWT = jwt.verify(token, SECRET_KEY);
            const foundUser = await USER.findOne({_id: decodedJWT.ID});
            if(foundUser) {
                res.render("user-dashboard", {
                    name: foundUser.name,
                    topic1: foundUser.topic1,
                    topic2: foundUser.topic2,
                    message: ""
                });
                return;
            }
        }
        next();
    }
    catch(error) {
        console.log(error);
        next();
    }
}

module.exports = getLoginMiddleware;