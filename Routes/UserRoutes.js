const express = require('express');
const userController = require('../Controllers/UserController');
const { VerifyManagerRole } = require('../Middlewares/RoleMiddleware');
const userRoutes = express.Router();

userRoutes.get('/',VerifyManagerRole, userController.list);
userRoutes.get('/profile/:id',VerifyManagerRole, userController.userById);
userRoutes.get('/employee',VerifyManagerRole, userController.employee);
userRoutes.get('/manager',VerifyManagerRole, userController.manager);
userRoutes.get('/profile', userController.profile);
userRoutes.put('/update', userController.updateProfile);
userRoutes.post('/createuser',VerifyManagerRole, userController.createUser);
userRoutes.delete('/:id',VerifyManagerRole, userController.deleteUser);

module.exports = userRoutes;
