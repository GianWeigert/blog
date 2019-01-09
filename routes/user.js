const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/User');
const User = mongoose.model('users');
const Validator = require('../validators/Validator');
const CreateUserValidator = require('../validators/users/CreateUserValidator');

router.get('/register', function(request, response) {
    return response.render('users/create_user');
});

router.post('/register', function(request, response) {
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
});

function setUser(parametersUser) {
    const user = {
        name: parametersUser.name,
        email: parametersUser.email,
        password: parametersUser.password.primary
    }

    return new User(user);
}

module.exports = router;