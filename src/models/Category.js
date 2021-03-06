'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({
    name: {
        type: String,
        require: true
    },
    slug: {
        type: String,
        require: true 
    },
    description: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        defautl: Date.now()
    }
});

module.exports = mongoose.model('categories', Category);