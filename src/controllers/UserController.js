'use strict'

const User = require('../models/User');
const Validator = require('../validators/Validator');
const CreateUserValidator = require('../validators/users/CreateUserValidator');

exports.renderRegister = (request, response) => {
    return response.render('users/create_user');
}

exports.register = (request, response) => {
    const formParameters = request.body;

    const validator =  new Validator(formParameters, CreateUserValidator);
    validator.validate();

    if (!validator.isValid()) {
        const errors = validator.getErrors();
        return response.render('users/create_user', {errors: errors});
    }

    const user = setUser(formParameters);

    user.save().then(() => {
        return response.redirect('/admin/categories');
    }).catch((error) => {
        console.log('Error saving user: ' + error);
    });
}

function setUser(parametersUser) {
    const user = {
        name: parametersUser.name,
        email: parametersUser.email,
        password: parametersUser.password.primary
    }

    return new User(user);
}