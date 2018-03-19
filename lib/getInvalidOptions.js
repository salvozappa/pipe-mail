const validator = require('validator');

const isEmail = string => validator.isEmail(string, { allow_display_name: true });

const notEmpty = string => !validator.isEmpty(string);

const optionalNotEmpty = value => typeof value === 'undefined' || notEmpty(value)

const optionalBoolean = value => typeof value === 'undefined' || typeof value === 'boolean'

const optionalPort = value => typeof value === 'undefined' || validator.isPort(value)

const getValidationFunction = (key) => {
    const validationFunctions = {
        'from': isEmail,
        'to': isEmail,
        'host': validator.isFQDN,
        'user': notEmpty,
        'password': notEmpty,
        'subject': optionalNotEmpty,
        'port': optionalPort,
        'ssl': optionalBoolean,
        'html': optionalBoolean
    }
    return validationFunctions[key];
}

const isValid = (key, options) => {
    return (getValidationFunction(key))(options[key]);
}

module.exports = (options) => {
    const optionKeys = Object.keys(options);
    return optionKeys.filter(key => !isValid(key, options));
};
