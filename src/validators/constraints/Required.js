'use strict';

const required = (constraint, value) => {
    if (!value || value == null || value == undefined) {
        return false;
    }

    return true;
}

module.exports = required;