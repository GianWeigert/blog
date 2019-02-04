'use strict';

const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoryController');

router.get('/', function(request, response) {
    return response.render('admin/index');
});

router.get('/categories', categoryController.get);
router.get('/categories/create', categoryController.renderCreate);
router.post('/categories/create', categoryController.create);
router.get('/categories/edit/:id', categoryController.renderEdit);
router.post('/categories/edit/:id', categoryController.edit);

module.exports = router;