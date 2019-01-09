const required = require('./Required');
const minLength = require('./MinLength');
const maxLength = require('./MaxLength');
const password = require('./Password');

const Constraints = {
    required: required,
    minLength: minLength,
    maxLength: maxLength,
    password: password
};

module.exports = Constraints;