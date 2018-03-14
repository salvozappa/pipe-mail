#!/usr/bin/env node

'use strict';

const nodemailer = require('nodemailer');

const readStandardInput = require('./lib/readStandardInput');
const sendMessage = require('./lib/sendMessage');

const mailOptions = {
    from: '"Hamaca Test Report" <no-reply@hamaca.io>',
    to: 'salvo.a.zappala@gmail.com',
    subject: 'Test report',
};

const transporter = nodemailer.createTransport({
    host: 'smtp.fastmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'salvatorezappala@fastmail.com',
        pass: 'umwbtgv5qjrzlhqn'
    }
});

(async () => {
    const input = await readStandardInput(process.stdin);
    sendMessage(input, mailOptions, transporter);
})();
