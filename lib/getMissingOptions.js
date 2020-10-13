const requiredKeys = [
    'from',
    'to',
    'host',
    'user',
    'password'
];

module.exports = (options) => {
    const providedKeys = Object.keys(options);
    return requiredKeys.filter(key => (typeof options[key] === 'undefined') || (!providedKeys.includes(key)));
};
