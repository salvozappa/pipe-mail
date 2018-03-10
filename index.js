#!/usr/bin/env node

'use strict';

const nodemailer = require('nodemailer');

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

// fetch message from standard input
const message = '';
process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if (chunk !== null) {
    message += chunk;
  }
});

// send message when standard input is over
process.stdin.on('end', () => {
    const mailOptions = {
        from: '"Hamaca Test Report" <no-reply@hamaca.io>',
        to: 'salvo.a.zappala@gmail.com',
        subject: 'Test report',
        // text: message,
        html: message
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            process.exit(1);
        }
        console.log('Message sent: %s', info.messageId);
    });
});
