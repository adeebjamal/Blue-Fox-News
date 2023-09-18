const nodeMailer = require("nodemailer");
const axios = require("axios");
const USER = require("../Models/user");
const API_KEY = require("../protected").Guardian_API_KEY;
const adminEmail = require("../protected").emailAddress;
const adminPassword = require("../protected").password;

const baseUrl = "https://content.guardianapis.com/search?q=";

const transporter = nodeMailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: adminEmail,
        pass: adminPassword
    }
});

const generateHTML = async(newsList)=> {
    let HTMLdata = "";
    for(let index=0; index<newsList.length; index++) {
        HTMLdata+= `<h2>${index+1}. ${newsList[index].sectionName}</h2>\n`;
        HTMLdata+= `<h2>${newsList[index].webTitle}</h2>\n`;
        HTMLdata+= `<a href=${newsList[index].webUrl}>Click here to read more</a>\n`;
        HTMLdata+= "<br>\n";
    }
    return HTMLdata;
}

const sendNews = async()=> {
    const userList = await USER.find();
    for(let index=0; index<userList.length; index++) {
        if(userList[index].subscribed) {
            const customUrl = `${baseUrl}${userList[index].topic1}%20OR${userList[index].topic2}&api-key=${API_KEY}`;
            const response = await axios.get(customUrl);
            const emailBody = await generateHTML(response.data.response.results);
            const mailOptions = {
                from: {
                    name: "Blue Fox Developers",
                    address: adminEmail
                },
                to: userList[index].email,
                subject: `News: ${userList[index].topic1} and ${userList[index].topic2}`,
                html: emailBody
            };
            try {
                await transporter.sendMail(mailOptions);
            }
            catch(error) {
                console.log("Something wrong happened while sending news.");
            }
        }
    }
}

module.exports = sendNews;