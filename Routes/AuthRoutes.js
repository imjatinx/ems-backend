const express = require('express');
const authController = require('../Controllers/AuthController');
const authRoutes = express.Router();

authRoutes.get('/', authController.welcome)
authRoutes.post('/login', authController.login)
authRoutes.post('/signup', authController.signup)


module.exports = authRoutes