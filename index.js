#!/usr/bin/env node

'use strict';

const nodemailer = require('nodemailer');
const commander = require('commander');

const readStandardInput = require('./lib/readStandardInput');
const sendMessage = require('./lib/sendMessage');

commander
    .version('0.1.0')
    .option('-f, --from <from>', 'Sender address')
    .option('-t, --to <to>', 'Recipient address')
    .option('-s, --subject <subject>', 'E-mail subject')
    .option('-h, --host <host>', 'SMTP server host', 'marble')
    .option('-u, --user <user>', 'SMTP login username')
    .option('-p, --password <password>', 'SMTP login password')
    .option('-i, --insecure', 'Disable TSL connection')
    .parse(process.argv);

console.log(commander.insecure);
process.exit();

const options = {
    from: commander.from,
    to: commander.to,
    subject: commander.subject,
    host: commander.host, // smtp.fastmail.com
    secure: true,
    user: commander.user,  //'salvatorezappala@fastmail.com',
    pass: commander.pass //'umwbtgv5qjrzlhqn'
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
