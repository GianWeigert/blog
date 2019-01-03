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
    date: {
        type: Date,
        defautl: Date.now()
    }
});

mongoose.model('categories', Category);