const minLength = function(constraint, value) {
    if (!value || value.length < constraint.numberOfCharacters) {
        return false;
    }

    return true;
}

module.exports = minLength;