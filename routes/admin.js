const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Category');
const Category = mongoose.model('categories');
const CategoryValidator = require('../validators/CategoryValidator');
const Validator = require('../validators/Validator');

router.get('/', function(request, response) {
    return response.render('admin/index');
});

router.get('/categories', function(request, response) {
    Category.find().then((categories) => {
        return response.render('admin/categories/list_categories', {categories: categories});
    }).catch(() => {
        console.log('Error listing category: ' + error);
    });
});

router.get('/categories/create', function(request, response) {
    return response.render('admin/categories/create_category', {errors: {}});
});

router.post('/categories/create', function(request, response) {
    var formParameters = {
        name: request.body.name,
        slug: request.body.slug,
        description: request.body.description
    }

    var validator =  new Validator(formParameters, CategoryValidator);
    validator.validate();

    if (!validator.isValid()) {
        var errors = validator.getErrors();
        return response.render('admin/categories/create_category', {errors: errors});
    }

    var category = new Category(formParameters);

    category.save().then(() => {
        return response.redirect('/admin/categories');
    }).catch((error) => {
        console.log('Error saving category: ' + error);
    });
});

router.get('/categories/edit/:id', function(request, response) {
    Category.findById(request.params.id).then((category) => {
        return response.render('admin/categories/edit_category', {category: category});
    }).catch((error) => {
        console.log('Error Category not found: ' + error);
    });
});

router.post('/categories/edit/:id', function(request, response) {
    Category.findById(request.params.id).then((category) => {
        var formParameters = {
            name: request.body.name,
            slug: request.body.slug,
            description: request.body.description
        }

        var validator =  new Validator(formParameters, CategoryValidator);
        validator.validate();

        if (!validator.isValid()) {
            var errors = validator.getErrors();
            return response.render('admin/categories/edit_category', {category: category, errors: errors});
        }

        category.name = request.body.name;
        category.slug = request.body.slug;
        category.description = request.body.description;

        category.save().then(() => {
            return response.redirect('/admin/categories');
        }).catch((error) => {
            console.log('Error saving category: ' + error);
        });
    }).catch((error) => {
        console.log('Error to edit category: Category not found: ' + error);
    });
});

module.exports = router;