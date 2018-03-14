const assert = require('assert');
const td = require('testdouble');
const sendMessage = require('../lib/sendMessage');

describe('sendMessage', () => {
    const transporterMock = {
        sendMail: td.function()
    }
    let mailOptions;

    beforeEach(() => {
        mailOptions = {
            from: '"Fake e-mail" <fake-email@nodomain.org>',
            to: 'fake-recipient@nodomain.org',
            subject: 'Fake subject',
        };
    });

    it('Should set the message', () => {
        sendMessage('This is the message', mailOptions, transporterMock);
        assert.equal(mailOptions.text, 'This is the message');
    });

    it('Should send the message via the nodemailer transporter', () => {
        sendMessage('This is the message', mailOptions, transporterMock);
        td.verify(transporterMock.sendMail(td.matchers.isA(Object), td.matchers.isA(Function)))
    });
});
