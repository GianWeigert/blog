const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.get('/register', userController.renderRegister );
router.post('/register', userController.register);

module.exports = router;