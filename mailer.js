#!/usr/bin/env node

'use strict';
const nodemailer = require('nodemailer');
var Convert = require('ansi-to-html');
var convert = new Convert({
    newline: true
});

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.fastmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'salvatorezappala@fastmail.com', // generated ethereal user
        pass: 'umwbtgv5qjrzlhqn'  // generated ethereal password
    }
});

// fetch message from standard input
let message = '';
process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if (chunk !== null) {
    message += chunk;
  }
});

// send message when standard input is over
process.stdin.on('end', () => {
    let mailOptions = {
        from: '"Hamaca Test Report" <no-reply@hamaca.io>',
        to: 'salvo.a.zappala@gmail.com',
        subject: 'Test report',
        // text: message,
        html: convert.toHtml(message)
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            process.exit(1);
        }
        console.log('Message sent: %s', info.messageId);
    });
});
