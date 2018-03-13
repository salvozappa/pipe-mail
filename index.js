#!/usr/bin/env node

'use strict';

const nodemailer = require('nodemailer');

const readStandardInput = require('./lib/readStandardInput');

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: 'smtp.fastmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'salvatorezappala@fastmail.com', // generated ethereal user
        pass: 'umwbtgv5qjrzlhqn'  // generated ethereal password
    }
});

const sendMessage = (message) => {
    console.log(message);
    // const mailOptions = {
    //     from: '"Hamaca Test Report" <no-reply@hamaca.io>',
    //     to: 'salvo.a.zappala@gmail.com',
    //     subject: 'Test report',
    //     // text: message,
    //     html: message
    // };
    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         console.log(error);
    //         process.exit(1);
    //     }
    //     console.log('Message sent: %s', info.messageId);
    // });
}

readStandardInput(process.stdin).then(sendMessage);
