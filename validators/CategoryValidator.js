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
        }
    ]
}

module.exports = CategoryValidator;