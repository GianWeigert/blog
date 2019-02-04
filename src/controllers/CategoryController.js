'use strict';

const Category = require('../models/Category');
const Validator = require('../validators/Validator');
const CategoryValidator = require('../validators/CategoryValidator');

exports.get = (request, response) => {
    Category.find().then((categories) => {
        return response.render('admin/categories/list_categories', {categories: categories});
    }).catch(() => {
        console.log('Error listing category: ' + error);
    });
}

exports.renderCreate = (request, response) => {
    return response.render('admin/categories/create_category', {errors: {}});
}

exports.create = (request, response) => {
    let formParameters = {
        name: request.body.name,
        slug: request.body.slug,
        description: request.body.description
    };

    const validator =  new Validator(formParameters, CategoryValidator);
    validator.validate();

    if (!validator.isValid()) {
        let errors = validator.getErrors();
        return response.render('admin/categories/create_category', {errors: errors});
    }

    let category = new Category(formParameters);

    category.save().then(() => {
        return response.redirect('/admin/categories');
    }).catch((error) => {
        console.log('Error saving category: ' + error);
    });
}

exports.renderEdit = (request, response) => {
    Category.findById(request.params.id).then((category) => {
        return response.render('admin/categories/edit_category', {category: category});
    }).catch((error) => {
        console.log('Error Category not found: ' + error);
    });
}

exports.edit = (request, response) => {
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
}