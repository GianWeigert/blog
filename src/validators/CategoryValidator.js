'use strict';

const CategoryValidator = {
    fields: [ 
        {
            name: 'name',
            constraints: [{
                constraintName: 'required',
                message: 'O campo nome deve ser preenchido'
            },
            {
                constraintName: 'minLength',
                numberOfCharacters: 3,
                message: 'O campo nome deve conter pelo menos 3 caracteres'
            }]
        },
        {
            name: 'slug',
            constraints: [{
                constraintName: 'required',
                message: 'O campo slug deve ser preenchido'
            },
            {
                constraintName: 'minLength',
                numberOfCharacters: 3,
                message: 'O campo slug deve conter pelo menos 3 caracteres'
            }]
        },
        {
            name: 'description',
            constraints: [{
                constraintName: 'required',
                message: 'O campo descrição deve ser preenchido'
            },
            {
                constraintName: 'minLength',
                numberOfCharacters: 3,
                message: 'O campo descrição deve conter pelo menos 3 caracteres'
            },
            {
                constraintName: 'maxLength',
                numberOfCharacters: 80,
                message: 'O campo descrição deve conter menos de 80 caracteres'
            }]
        }
    ]
}

module.exports = CategoryValidator;