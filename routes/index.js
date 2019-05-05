const express = require('express');
const router  = express.Router();
const routes  = require('./routes');
const middlewares = require('../middlewares/middlewares');

//employees endpoints
router.get('/employees', routes.employees.listAllEmployees);

router.get('/employees/:id', middlewares.authenticate, middlewares.getIDAsInteger, routes.employees.listOneEmployee);

router.post('/employees', routes.employees.createEmployee);

router.patch('/employees/:id', middlewares.getIDAsInteger, routes.employees.updateEmployee);

router.delete('/employees/:id', middlewares.getIDAsInteger, routes.employees.deleteEmployee);

//departments endpoints
router.get('/departments', routes.departments.listAllDepartments);

router.get('/departments/:id', middlewares.getIDAsInteger, routes.departments.listOneDepartment);

router.get('/departments/:id/employees', middlewares.getIDAsInteger, routes.departments.getDepartmentEmployees);

router.post('/departments', routes.departments.createDepartment);

router.patch('/departments/:id', middlewares.getIDAsInteger, routes.departments.updateDepartment);

router.delete('/departments/:id', middlewares.getIDAsInteger, routes.departments.deleteDepartment);

module.exports = router;