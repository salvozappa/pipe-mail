const assert = require('assert');
const getMissingOptions = require('../lib/getMissingOptions');

describe('getMissingOptions', () => {
    it('Should return "from" and "to" if they are missing', () => {
        const options = {};
        const missingOptions = new Set(getMissingOptions(options));
        assert(missingOptions.has('from') && missingOptions.has('to'));
    });

    it('Should not return "from" and "to" if they are present', () => {
        const options = {
            from: 'foo@bar.com',
            to: 'bar@foo.com'
        };
        const missingOptions = new Set(getMissingOptions(options));
        assert(!missingOptions.has('from') && !missingOptions.has('to'));
    });

    it('Should return "host" if it\'s missing', () => {
        const options = {};
        const missingOptions = new Set(getMissingOptions(options));
        assert(missingOptions.has('host'));
    });

    it('Should not return "host" if it\'s present', () => {
        const options = {
            host: 'smtp.foo.com'
        };
        const missingOptions = new Set(getMissingOptions(options));
        assert(!missingOptions.has('host'));
    });

    it('Should return "password" if it\'s missing', () => {
        const options = {};
        const missingOptions = new Set(getMissingOptions(options));
        assert(missingOptions.has('password'));
    });

    it('Should not return "password" if it\'s present', () => {
        const options = {
            password: 'mypassword'
        };
        const missingOptions = new Set(getMissingOptions(options));
        assert(!missingOptions.has('password'));
    });

    it('Should not consider "port" mandatory', () => {
        const options = {};
        const missingOptions = new Set(getMissingOptions(options));
        assert(!missingOptions.has('port'));
    });

    it('Should not consider "ssl" mandatory', () => {
        const options = {};
        const missingOptions = new Set(getMissingOptions(options));
        assert(!missingOptions.has('ssl'));
    });

    it('Should not consider "html" mandatory', () => {
        const options = {};
        const missingOptions = new Set(getMissingOptions(options));
        assert(!missingOptions.has('html'));
    });

    it('Should consider undefined values as missing', () => {
        const options = {
            to: undefined
        };
        const missingOptions = new Set(getMissingOptions(options));
        assert(missingOptions.has('to'));
    });
});
