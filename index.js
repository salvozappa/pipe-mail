#!/usr/bin/env node

'use strict';

const nodemailer = require('nodemailer');
const commander = require('commander');

const readStandardInput = require('./lib/readStandardInput');
const sendMessage = require('./lib/sendMessage');
const createTransporter = require('./lib/createTransporter');
const requireOptions = require('./lib/requireOptions');

commander
    .version('0.1.0')
    .option('-f, --from <from>', 'Sender address')
    .option('-t, --to <to>', 'Recipient address')
    .option('-s, --subject <subject>', 'E-mail subject')
    .option('-h, --host <host>', 'SMTP server host')
    .option('-u, --user <user>', 'SMTP login username')
    .option('-p, --password <password>', 'SMTP login password')
    .parse(process.argv);

const options = {
    from: commander.from,
    to: commander.to,
    subject: commander.subject,
    host: commander.host        || process.env.SMTP_HOST, // smtp.fastmail.com
    user: commander.user        || process.env.SMTP_USER,  //'salvatorezappala@fastmail.com',
    pass: commander.pass        || process.env.SMTP_PASSWORD //'umwbtgv5qjrzlhqn'
};

const missingOptions = requireOptions(options);
if (missingOptions.length > 0) {
    commander.outputHelp();
    process.exit();
}

const transporter = createTransporter(options, nodemailer);

(async () => {
    const input = await readStandardInput(process.stdin);
    sendMessage(input, options, transporter);
})();
