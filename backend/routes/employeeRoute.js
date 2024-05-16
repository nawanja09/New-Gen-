const express = require('express');
const router = express.Router();
const { getAll, createEmployee, deleteEmployee ,getOne,updateEmployee} = require('../controllers/employeeControl');

// Get all employees
router.get('/getall', getAll);

// Create a new employee
router.post('/create', createEmployee);

// Delete an employee
router.delete('/delete/:employeeId', deleteEmployee);

// get one employee
router.get('/getone/:employeeId', getOne);

// update an employee
router.put('/update/:employeeId', updateEmployee);


module.exports = router;