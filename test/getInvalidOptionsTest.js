const assert = require('assert');
const getInvalidOptions = require('../lib/getInvalidOptions');

describe('getInvalidOptions', () => {
    let options;

    it('Should accept valid e-mails', () => {
        options = {
            from: 'foo@bar.com',
            to: 'bar@foo.com',
        };
        const invalidOptions = new Set(getInvalidOptions(options));
        assert(!invalidOptions.has('from') && !invalidOptions.has('to'));
    });

    it('Should not accept invalid e-mails', () => {
        options = {
            from: 'invalidemail',
            to: 'invalidemail',
        };
        const invalidOptions = new Set(getInvalidOptions(options));
        assert(invalidOptions.has('from') && invalidOptions.has('to'));
    });

    it('Should accept a valid host', () => {
        options = {
            host: 'smtp.foo.com',
        };
        const invalidOptions = new Set(getInvalidOptions(options));
        assert(!invalidOptions.has('host'));
    });

    it('Should not accept an invalid host', () => {
        options = {
            host: 'invalidhost',
        };
        const invalidOptions = new Set(getInvalidOptions(options));
        assert(invalidOptions.has('host'));
    });

    it('Should accept non-empty credentials', () => {
        options = {
            user: 'user',
            password: 'password'
        };
        const invalidOptions = new Set(getInvalidOptions(options));
        assert(!invalidOptions.has('user') && !invalidOptions.has('password'));
    });

    it('Should not accept empty credentials', () => {
        options = {
            user: '',
            password: ''
        };
        const invalidOptions = new Set(getInvalidOptions(options));
        assert(invalidOptions.has('user') && invalidOptions.has('password'));
    });

    it('Should accept a valid port number', () => {
        options = {
            port: '2020'
        };
        const invalidOptions = new Set(getInvalidOptions(options));
        assert(!invalidOptions.has('port'));
    });

    it('Should not accept a non-numeric port number', () => {
        options = {
            port: 'abc'
        };
        const invalidOptions = new Set(getInvalidOptions(options));
        assert(invalidOptions.has('port'));
    });

    it('Should not consider port if undefined', () => {
        options = {
            port: undefined
        };
        const invalidOptions = new Set(getInvalidOptions(options));
        assert(!invalidOptions.has('port'));
    });

    it('Should not consider subject if undefined', () => {
        options = {
            subject: undefined
        };
        const invalidOptions = new Set(getInvalidOptions(options));
        assert(!invalidOptions.has('subject'));
    });

    it('Should accept "ssl" option if boolean', () => {
        options = {
            ssl: true
        };
        const invalidOptions = new Set(getInvalidOptions(options));
        assert(!invalidOptions.has('ssl'));
    });

    it('Should not accept "ssl" option if non-boolean', () => {
        options = {
            ssl: 'abc'
        };
        const invalidOptions = new Set(getInvalidOptions(options));
        assert(invalidOptions.has('ssl'));
    });

    it('Should not consider "ssl" option if undefined', () => {
        options = {
            ssl: undefined
        };
        const invalidOptions = new Set(getInvalidOptions(options));
        assert(!invalidOptions.has('ssl'));
    });

    it('Should accept "html" option if boolean', () => {
        options = {
            html: true
        };
        const invalidOptions = new Set(getInvalidOptions(options));
        assert(!invalidOptions.has('html'));
    });

    it('Should not accept "html" option if non-boolean', () => {
        options = {
            html: 'abc'
        };
        const invalidOptions = new Set(getInvalidOptions(options));
        assert(invalidOptions.has('html'));
    });

    it('Should not consider "html" option if undefined', () => {
        options = {
            html: undefined
        };
        const invalidOptions = new Set(getInvalidOptions(options));
        assert(!invalidOptions.has('html'));
    });
});
