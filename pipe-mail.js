#!/usr/bin/env node

'use strict';

const VERSION = require('./package.json').version;

// const nodemailer = require('nodemailer');
const commander = require('commander');

// const readStandardInput = require('./lib/readStandardInput');
// const sendMessage = require('./lib/sendMessage');
// const createTransporter = require('./lib/createTransporter');
// const getMissingOptions = require('./lib/getMissingOptions');
// const getInvalidOptions = require('./lib/getInvalidOptions');

const printHelpAndExit = () => {
    commander.outputHelp();
    process.exit();
};

const handleError = (error) => {
    console.error(`\n  The server returned an error: "${error.response}"\n`);
    process.exit(1);
};

commander
    .version(VERSION)
    .argument("<to-email-address>", "Recipient email address")
    .argument("[from-email-address]",
        "Sender email address. Defaults to PIPEMAIL_FROM environment variable")
    .option("-s, --subject <subject>", "Email subject")
    .option("-o, --host <host>", "SMTP server host")
    .option("-r, --port <port>", "SMTP server port. Defaults to 485 if SSL is in use, 587 if not")
    .option("-n, --no-ssl", "Don't use SSL when connecting to the SMTP server")
    .option("-t, --html", "Send message as HTML")
    .option("-u, --user <user>", "SMTP login username")
    .option("-p, --password <password>", "SMTP login password")
    .parse(process.argv);

const args = commander.args;
const options = commander.opts();

const parameters = {
    to: args[0],
    from: (args.length > 1) ? args[1] : process.env.PIPEMAIL_FROM,
    subject: options.subject,
    host: options.host            || process.env.PIPEMAIL_SMTP_HOST,
    user: options.user            || process.env.PIPEMAIL_SMTP_USER,
    password: options.password    || process.env.PIPEMAIL_SMTP_PASSWORD,
    port: options.port            || process.env.PIPEMAIL_SMTP_PORT,
    ssl: options.ssl,
    html: options.html
};

console.log(parameters);

// const missingOptions = getMissingOptions(options);
// if (missingOptions.length > 0) {
//     console.log('\n  The following mandatory options are missing: ' + missingOptions.join(', ') + '\n');
//     printHelpAndExit();
// }

// const invalidOptions = getInvalidOptions(options);
// if (invalidOptions.length > 0) {
//     console.log('\n  The following options are invalid: ' + invalidOptions.join(', '));
//     printHelpAndExit();
// }

// const transporter = createTransporter(options, nodemailer);

// (async () => {
//     const input = await readStandardInput(process.stdin);
//     sendMessage(input, options, transporter).catch(handleError);
// })();
