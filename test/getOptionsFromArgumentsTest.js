const assert = require('assert');
const getOptionsFromArguments = require('../lib/getOptionsFromArguments');

describe('readOptionsFromArguments', () => {
    it('Should return an object', () => {
        const commanderArguments = ['from@fastmail.com', 'to@fastmail.com'];
        const optionsFromArguments = getOptionsFromArguments(commanderArguments);
        assert(typeof optionsFromArguments === 'object');
    });
    
    it('Should return a correctly populated arguments object', () => {
        const commanderArguments = ['from@fastmail.com', 'to@fastmail.com'];
        const optionsFromArguments = getOptionsFromArguments(commanderArguments);
        assert(optionsFromArguments.from === 'from@fastmail.com');
        assert(optionsFromArguments.to === 'to@fastmail.com');
    });

    it('Should set a single argument as the "to" email address', () => {
        const commanderArguments = ['to@fastmail.com'];
        const optionsFromArguments = getOptionsFromArguments(commanderArguments);
        assert(optionsFromArguments.to === 'to@fastmail.com');
    });

    it('Should not return a "from" address if only one argument is provided', () => {
        const commanderArguments = ['to@fastmail.com'];
        const optionsFromArguments = getOptionsFromArguments(commanderArguments);
        assert(!optionsFromArguments.hasOwnProperty('from'));
    });

    it('Should return an empty array if no arguments are provided', () => {
        const commanderArguments = [];
        const optionsFromArguments = getOptionsFromArguments(commanderArguments);
        assert(Object.keys(optionsFromArguments).length === 0);
    });
});
