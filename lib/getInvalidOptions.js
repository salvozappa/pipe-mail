const validator = require('validator');

const isEmail = string => validator.isEmail(string, { allow_display_name: true });

const notEmpty = string => !validator.isEmpty(string);

const isBooleanOrUndefined = value => typeof value === 'undefined' || typeof value === 'boolean'

const isPortOrUndefined = value => typeof value === 'undefined' || validator.isPort(value)

const getValidationFunction = (key) => {
    const validationFunctions = {
        'from': isEmail,
        'to': isEmail,
        'host': validator.isFQDN,
        'user': notEmpty,
        'pass': notEmpty,
        'subject': notEmpty,
        'port': isPortOrUndefined,
        'ssl': isBooleanOrUndefined
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
