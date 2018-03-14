#!/usr/bin/env node

'use strict';

const nodemailer = require('nodemailer');
const commander = require('commander');

const readStandardInput = require('./lib/readStandardInput');
const sendMessage = require('./lib/sendMessage');
const createTransporter = require('./lib/createTransporter');

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

const options = {
    from: commander.from,
    to: commander.to,
    subject: commander.subject,
    host: commander.host || process.env.SMTP_HOST, // smtp.fastmail.com
    secure: commander.insecure || process.env.SMTP_NOTLS,
    user: commander.user || SMTP_USER,  //'salvatorezappala@fastmail.com',
    pass: commander.pass || SMTP_PASSWORD //'umwbtgv5qjrzlhqn'
};

const transporter = createTransporter(options, nodemailer);

(async () => {
    const input = await readStandardInput(process.stdin);
    sendMessage(input, options, transporter);
})();
