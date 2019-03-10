const nodeMailer = require('nodemailer');
const {transportConfig} = require('./config');

let sendMail = (from , to, subject, text) => {
    const transporter = nodeMailer.createTransport(transportConfig);
    
    const mailOptions = {
        from: from,
        to: to ,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (err, response)=> {
        if(err) throw new Error(e);
        console.log('Email sent: '+response);
    });

};

module.exports = {sendMail};

