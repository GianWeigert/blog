'use strict';

const Category = require('../models/Category');

exports.fetch = async() => {
    let categories = await Category.find();

    return categories;
}

exports.findById = async(id) => {
    let category = await Category.findById(id);

    return category;
}

exports.register = async(category) => {
    await category.save();
}

exports.update = async(category) => {
    await category.save();
}