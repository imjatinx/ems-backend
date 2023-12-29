const express = require('express');
const deptController = require('../Controllers/DeptCotroller');
const { VerifyManagerRole } = require('../Middlewares/RoleMiddleware');
const deptRoutes = express.Router()

deptRoutes.get('/',VerifyManagerRole, deptController.list)
deptRoutes.get('/:id',VerifyManagerRole, deptController.getDeptById)
deptRoutes.post('/',VerifyManagerRole, deptController.create)
deptRoutes.put('/:id',VerifyManagerRole, deptController.update)
deptRoutes.delete('/:id',VerifyManagerRole, deptController.delete)

module.exports = deptRoutes;