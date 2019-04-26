const express = require('express');
const router  = express.Router();
const routes  = require('./routes')


router.get('/employees', routes.employees.listAllEmployees);

module.exports = router;