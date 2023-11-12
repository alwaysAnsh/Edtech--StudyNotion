const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email , title, body ) =>{
    try {
        const transporter = nodemailer.createTransport({
            host : process.env.MAIL_HOST,
            auth : {
                user : process.env.MAIL_USER,
                pass : process.env.MAIL_PASS,
            }
        })
            //SEND MAIL
            let info = await transporter.sendMail({
                from: 'StudyNotion', // sender address
                to: `${email}`, // list of receivers
                subject: `${title}`, // Subject line
                html: `${body}`, // html body
              })
              console.log(info);
              return info;
        
    }  
    catch(err){
        console.log(err);
    }

};

module.exports = mailSender;