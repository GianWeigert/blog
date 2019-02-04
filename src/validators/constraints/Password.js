'use strict';

const password = (constraint, value) => {
    if (value[constraint.firstField] !== value[constraint.secondField] ) {
        return false;
    }

    return true;
}

module.exports = password;