const assert = require('assert');
const td = require('testdouble');
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

    it('Should return "pass" if it\'s missing', () => {
        const options = {};
        const missingOptions = new Set(getMissingOptions(options));
        assert(missingOptions.has('pass'));
    });

    it('Should not return "pass" if it\'s present', () => {
        const options = {
            pass: 'smtp.foo.com'
        };
        const missingOptions = new Set(getMissingOptions(options));
        assert(!missingOptions.has('pass'));
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

    it('Should consider undefined values as missing', () => {
        const options = {
            to: undefined
        };
        const missingOptions = new Set(getMissingOptions(options));
        assert(missingOptions.has('to'));
    });
});
