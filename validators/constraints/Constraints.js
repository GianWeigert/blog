const required = require('./Required');
const minLength = require('./MinLength');
const maxLength = require('./MaxLength');

const Constraints = {
    required: required,
    minLength: minLength,
    maxLength: maxLength
};

module.exports = Constraints;