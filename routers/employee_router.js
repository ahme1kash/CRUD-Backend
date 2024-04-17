const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee_controller');

// Define routes
router.get('/allEmployees', employeeController.getAllEmployees);
router.get('/createNew',employeeController.addorEditNewPage);   
router.get('/deleteAll',employeeController.deleteAllEmployee);
router.post('/addNewEmployee', employeeController.addNewEmployee);
router.get('/edit/:employee_id', employeeController.getEmployeeById);
router.put('/:employee_id', employeeController.updateEmployee);
router.get('/deleteId/:employee_id', employeeController.deleteEmployee);


// Add other routes here (create, update, delete)

module.exports = router;