'use strict';

const Constraints = require('./constraints/Constraints');

class Validator {
    constructor(parameters, typeValidator) {
        this.parameters = parameters;
        this.typeValidator = typeValidator;
        this.errors = {};
    }

    validate() {
        var fields = this.typeValidator.fields;

        fields.forEach((field) => {
            var parameter = this.parameters[field.name];
            var constraints = field.constraints;
    
            constraints.forEach((constraint) => {
                if (this.errors[field.name] !== undefined) {
                    return false;
                }
    
                var validation = this.callValidation(constraint, parameter);
    
                if (!validation) {
                    this.errors[field.name] = constraint.message;
                }
            });
    
            return this.errors;
        });
    }

    callValidation(constraint, value) {
        var result = Constraints[constraint.constraintName](constraint, value);

        return result;
    }

    isValid() {
        for(var error in this.errors) {
            return false;            
        }

        return true;
    }

    getErrors() {
        return this.errors;
    }
}

module.exports = Validator;
