'use strict';

const maxLength = (constraint, value) => {
    if (!value || value.length > constraint.numberOfCharacters) {
        return false;
    }

    return true;
}

module.exports = maxLength;