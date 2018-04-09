#!/usr/bin/env node

'use strict';

const VERSION = require('./package.json').version;

const nodemailer = require('nodemailer');
const commander = require('commander');

const readStandardInput = require('./lib/readStandardInput');
const sendMessage = require('./lib/sendMessage');
const createTransporter = require('./lib/createTransporter');
const getMissingOptions = require('./lib/getMissingOptions');
const getInvalidOptions = require('./lib/getInvalidOptions');
const getOptionsFromArguments = require('./lib/getOptionsFromArguments');

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
    .arguments('[from-email-address]')
    .arguments('<recipient-email-address>')
    .option('-s, --subject <subject>', 'e-mail subject')
    .option('-o, --host <host>', 'SMTP server host')
    .option('-r, --port <port>', 'SMTP server port. Defaults to 485 if SSL is in use, 587 if not')
    .option('-n, --no-ssl', 'Don\'t use SSL when connecting to the SMTP server')
    .option('-t, --html', 'Send message as HTML')
    .option('-u, --user <user>', 'SMTP login username')
    .option('-p, --password <password>', 'SMTP login password')
    .parse(process.argv);

const optionsFromArguments = getOptionsFromArguments(commander.args);

const options = {
    from: optionsFromArguments.from || process.env.PIPEMAIL_FROM,
    to: optionsFromArguments.to,
    subject: commander.subject,
    host: commander.host            || process.env.PIPEMAIL_SMTP_HOST,
    user: commander.user            || process.env.PIPEMAIL_SMTP_USER,
    password: commander.password    || process.env.PIPEMAIL_SMTP_PASSWORD,
    port: commander.port            || process.env.PIPEMAIL_SMTP_PORT,
    ssl: commander.ssl,
    html: commander.html
};

const missingOptions = getMissingOptions(options);
if (missingOptions.length > 0) {
    console.log('\n  The following mandatory options are missing: ' + missingOptions.join(', ') + '\n');
    printHelpAndExit();
}

const invalidOptions = getInvalidOptions(options);
if (invalidOptions.length > 0) {
    console.log('\n  The following options are invalid: ' + invalidOptions.join(', '));
    printHelpAndExit();
}

const transporter = createTransporter(options, nodemailer);

(async () => {
    const input = await readStandardInput(process.stdin);
    sendMessage(input, options, transporter).catch(handleError);
})();
