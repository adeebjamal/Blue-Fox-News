const nodeMailer = require("nodemailer");
const emailAddress = require("../protected").emailAddress;
const password = require("../protected").password;

const transporter = nodeMailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: emailAddress,
        pass: password
    }
});

const sendOTP = async(email, OTP) => {
    const mailOptions = {
        from: {
            name: "Blue Fox Developers",
            address: emailAddress
        },
        to: [email],
        subject: "Blue Fox News: Verify e-mail",
        text: "Thankyou for registering to Blue Fox News. This is the OTP you can use to verify your email.",
        html: `<h1>OTP for e-mail verification: ${OTP}</h1>`
    }
    try {
        transporter.sendMail(mailOptions);
        console.log("Email sent.");
    }
    catch(error) {
        console.log("Something went wrong.");
    }
}

module.exports = sendOTP;