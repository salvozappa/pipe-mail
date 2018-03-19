const assert = require('assert');
const td = require('testdouble');
const sendMessage = require('../lib/sendMessage');

describe('sendMessage', () => {
    const transporterMock = {
        sendMail: td.function()
    }
    let options;

    beforeEach(() => {
        options = {
            from: '"Fake e-mail" <fake-email@nodomain.org>',
            to: 'fake-recipient@nodomain.org',
            subject: 'Fake subject',
        };
    });

    it('Should put the message in the "text" nodemailer option by default', () => {
        sendMessage('This is the message', options, transporterMock);
        td.verify(
            transporterMock.sendMail(
                td.matchers.contains({ text: 'This is the message' }),
                td.matchers.anything()
            )
        );
    });

    it('Should put the message in the "html" nodemailer option if html mode is set', () => {
        options.html = true;
        sendMessage('This is the message', options, transporterMock);
        td.verify(
            transporterMock.sendMail(
                td.matchers.contains({ html: 'This is the message' }),
                td.matchers.anything()
            )
        );
    });

    it('Should not set the "text" nodemailer option if html mode is set', () => {
        options.html = true;
        sendMessage('This is the message', options, transporterMock);
        td.verify(
            transporterMock.sendMail(
                td.matchers.argThat((options) => { return typeof options.text === 'undefined' }),
                td.matchers.anything()
            )
        );
    });

    it('Should not set the "html" nodemailer option by default', () => {
        sendMessage('This is the message', options, transporterMock);
        td.verify(
            transporterMock.sendMail(
                td.matchers.argThat((options) => { return typeof options.html === 'undefined' }),
                td.matchers.anything()
            )
        );
    });

    it('Should send the message via the nodemailer transporter', () => {
        sendMessage('This is the message', options, transporterMock);
        td.verify(
            transporterMock.sendMail(
                td.matchers.isA(Object),
                td.matchers.isA(Function)
            )
        );
    });

    it('Should not pass an invalid option to the transporter', () => {
        options.foo = 'bar';
        sendMessage('This is the message', options, transporterMock);
        td.verify(
            transporterMock.sendMail(
                td.matchers.argThat((options) => { return typeof options.foo === 'undefined' }),
                td.matchers.anything()
            )
        );
    });
});
