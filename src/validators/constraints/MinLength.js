'use strict';

const minLength = (constraint, value) => {
    if (!value || value.length < constraint.numberOfCharacters) {
        return false;
    }

    return true;
}

module.exports = minLength;