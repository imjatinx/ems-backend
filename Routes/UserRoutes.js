const express = require('express');
const userController = require('../Controllers/UserController');
const { VerifyManagerRole } = require('../Middlewares/RoleMiddleware');
const userRoutes = express.Router();

userRoutes.get('/',VerifyManagerRole, userController.list);
userRoutes.get('/employee',VerifyManagerRole, userController.employee);
userRoutes.get('/employee/:id',VerifyManagerRole, userController.employeeById);
userRoutes.get('/manager',VerifyManagerRole, userController.manager);
userRoutes.get('/manager/:id',VerifyManagerRole, userController.managerById);

module.exports = userRoutes;
