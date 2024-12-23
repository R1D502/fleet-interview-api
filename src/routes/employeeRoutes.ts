import { Router } from 'express';
import * as employeeController from '../controllers/employeeController';

const router = Router();

// GET /employees - Get all employees
router.get('/', employeeController.getAllEmployees);

// GET /employees/:id - Get a specific employee
router.get('/:id', employeeController.getEmployeeById);

// POST /employees - Create a new employee
router.post('/', employeeController.createEmployee);

// PUT /employees/:id - Update an employee
router.put('/:id', employeeController.updateEmployee);

// DELETE /employees/:id - Delete an employee
router.delete('/:id', employeeController.deleteEmployee);

export default router;
