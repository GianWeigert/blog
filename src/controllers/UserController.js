'use strict'

const User = require('../models/User');
const Validator = require('../validators/Validator');
const CreateUserValidator = require('../validators/users/CreateUserValidator');
const UserRepository = require('../repositories/UserRepository');

exports.renderRegister = (request, response) => {
    return response.render('users/create_user');
}

exports.register = async(request, response) => {
    let formParameters = request.body;

    let validator =  new Validator(formParameters, CreateUserValidator);
    validator.validate();

    if (!validator.isValid()) {
        let errors = validator.getErrors();

        return response.render(
            'users/create_user',
            {errors: errors}
        );
    }

    try {
        let user = setUser(formParameters);
        await UserRepository.register(user);

        return response.redirect('/admin/categories');
    } catch(error) {
        console.log('Error saving user: ' + error);
    }
}

function setUser(parametersUser) {
    let user = {
        name: parametersUser.name,
        email: parametersUser.email,
        password: parametersUser.password.primary
    }

    return new User(user);
}