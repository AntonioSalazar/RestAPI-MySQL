const express = require('express');
const router  = express.Router();
const routes  = require('./routes');
const middlewares = require('../middlewares/middlewares')


router.get('/employees', routes.employees.listAllEmployees);

router.get('/employees/:id',  middlewares.getIDAsInteger, routes.employees.listOneEmployee);

router.post('/employees', routes.employees.createEmployee);

router.patch('/employees/:id', middlewares.getIDAsInteger, routes.employees.updateEmployee);

router.delete('/employees/:id', middlewares.getIDAsInteger, routes.employees.deleteEmployee);

module.exports = router;