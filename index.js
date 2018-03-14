#!/usr/bin/env node

'use strict';

const nodemailer = require('nodemailer');

const readStandardInput = require('./lib/readStandardInput');
const sendMessage = require('./lib/sendMessage');

const options = {
    from: '"Hamaca Test Report" <no-reply@hamaca.io>',
    to: 'salvo.a.zappala@gmail.com',
    subject: 'Test report',
    host: 'smtp.fastmail.com',
    port: 465,
    secure: true,
    user: 'salvatorezappala@fastmail.com',
    pass: 'umwbtgv5qjrzlhqn'
};

const mailOptions = {
    from: options.from,
    to: options.to,
    subject: options.subject,
};

const transporter = nodemailer.createTransport({
    host: options.host,
    port: options.port,
    secure: options.secure,
    auth: {
        user: options.user,
        pass: options.pass
    }
});

(async () => {
    const input = await readStandardInput(process.stdin);
    sendMessage(input, mailOptions, transporter);
})();
