'use strict';

const Category = require('../models/Category');
const Validator = require('../validators/Validator');
const CategoryValidator = require('../validators/CategoryValidator');
const CategoryRepository = require('../repositories/CategoryRepository');

exports.get = async(request, response) => {
    try {
        let categories = await CategoryRepository.fetch();

        return response.render(
            'admin/categories/list_categories',
            {categories: categories}
        );
    } catch(error) {
        console.log('Error listing category: ' + error);
    }
}

exports.renderCreate = (request, response) => {
    return response.render(
        'admin/categories/create_category',
        {errors: {}}
    );
}

exports.create = async(request, response) => {
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

    try {
        let category = new Category(formParameters);
        await CategoryRepository.register(category);

        return response.redirect('/admin/categories');
    } catch(error) {
        console.log('Error saving category: ' + error);
    }
}

exports.renderEdit = async(request, response) => {
    let id =  request.params.id;

    try {
        let category = await CategoryRepository.findById(id);

        return response.render(
            'admin/categories/edit_category',
            {category: category}
        );
    } catch(error) {
        console.log('Error Category not found: ' + error);
    }
}

exports.edit = async(request, response) => {
    let id =  request.params.id;

    try {
        let category = await CategoryRepository.findById(id);

        let formParameters = {
            name: request.body.name,
            slug: request.body.slug,
            description: request.body.description
        }

        var validator =  new Validator(formParameters, CategoryValidator);
        validator.validate();

        if (!validator.isValid()) {
            var errors = validator.getErrors();
            return response.render(
                'admin/categories/edit_category',
                {
                    category: category,
                    errors: errors
                }
            );
        }

        category.name = request.body.name;
        category.slug = request.body.slug;
        category.description = request.body.description;

        await CategoryRepository.update(category);

        return response.redirect('/admin/categories');
    } catch(error) {
        console.log('Error to edit category: Category not found: ' + error);
    }
}