const CreateUserValidator = {
    fields: [{
        name: 'name',
        constraints: [{
            constraintName: 'required',
            message: 'Por favor, digite o seu nome de usuário.'
        }, {
            constraintName: 'minLength',
            numberOfCharacters: 4,
            message: 'O campo nome deve conter pelo menos 4 caracteres'
        }]
    }, {
        name: 'email',
        constraints: [{
            constraintName: 'required',
            message: 'Por favor, digite seu email.'
        }]
    }, {
        name: 'password',
        constraints:[{
            constraintName: 'password',
            firstField: 'primary',
            secondField: 'confirm',
            message: 'Os campos senha e a confirmação da senha estão divergentes.'
        }]
    }]
}

module.exports = CreateUserValidator;