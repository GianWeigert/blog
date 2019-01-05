const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/User');
const User = mongoose.model('users');

router.get('/register', function(request, response) {
    return response.render('users/create_user');
});

module.exports = router;