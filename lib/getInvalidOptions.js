const validator = require('validator');

const isEmail = (string) => {
    return validator.isEmail(string, {
        allow_display_name: true
    })
}

const notEmpty = (string) => {
    return !validator.isEmpty(string);
}

const getValidationFunction = (key) => {
    const validationFunctions = {
        'from': isEmail,
        'to': isEmail,
        'subject': notEmpty,
        'host': validator.isFQDN,
        'user': notEmpty,
        'pass': notEmpty
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
