const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Category');
const Category = mongoose.model('categories');
const CategoryValidator = require('../validators/CategoryValidator');
const Validator = require('../validators/Validator');

router.get('/', function(request, response) {
    response.render('admin/index');
});

router.get('/posts', function(request, response) {

});

router.get('/categories', function(request, response) {
    Category.find().then((categories) => {
        response.render('admin/list_categories', {categories: categories});
    }).catch(() => {
        console.log('Error listing category: ' + error);
    });
});

router.get('/categories/create', function(request, response) {
    response.render('admin/create_category', {errors: {}});
});

router.post('/categories/create', function(request, response) {
    var formParameters = {
        name: request.body.name,
        slug: request.body.slug
    }

    var validator =  new Validator(formParameters, CategoryValidator);
    validator.validate();

    if (!validator.isValid()) {
        var errors = validator.getErrors();
        console.log(errors);
        response.render('admin/create_category', {errors: errors});
    }

    var category = new Category(formParameters);

    category.save().then(() => {
        response.redirect('/admin/categories');
    }).catch((error) => {
        console.log('Error saving category: ' + error);
    });
});

module.exports = router;