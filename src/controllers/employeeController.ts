import { Request, Response } from 'express';
import { dbAll, dbGet, dbRun } from '../database/db';
import { Employee, EmployeeRow } from '../entities/types';

export const getAllEmployees = async (req: Request, res: Response): Promise<void> => {
  try {
    const employees = await dbAll<[], EmployeeRow>('SELECT * FROM employees');
    res.json(employees);
  } catch (error) {
    console.error('Error getting employees:', error);
    res.status(500).json({ error: 'Failed to get employees' });
  }
};

export const getEmployeeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const employee = await dbGet<[string], EmployeeRow>(
      'SELECT * FROM employees WHERE id = ?',
      [id]
    );
    
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    res.json(employee);
  } catch (error) {
    console.error('Error getting employee:', error);
    res.status(500).json({ error: 'Failed to get employee' });
  }
};

export const createEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, role } = req.body as Employee;
    
    if (!name || !role) {
      return res.status(400).json({ error: 'Name and role are required' });
    }

    const result = await dbRun<[string, string]>(
      'INSERT INTO employees (name, role) VALUES (?, ?)',
      [name, role]
    );

    res.status(201).json({ 
      id: result.lastID, 
      name, 
      role 
    });
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ error: 'Failed to create employee' });
  }
};

export const updateEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, role } = req.body as Employee;

    if (!name || !role) {
      return res.status(400).json({ error: 'Name and role are required' });
    }

    const employee = await dbGet<[string], EmployeeRow>(
      'SELECT * FROM employees WHERE id = ?',
      [id]
    );

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    await dbRun<[string, string, string]>(
      'UPDATE employees SET name = ?, role = ? WHERE id = ?',
      [name, role, id]
    );

    res.json({ id: Number(id), name, role });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ error: 'Failed to update employee' });
  }
};

export const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const employee = await dbGet<[string], EmployeeRow>(
      'SELECT * FROM employees WHERE id = ?',
      [id]
    );

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    await dbRun<[string]>('DELETE FROM employees WHERE id = ?', [id]);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ error: 'Failed to delete employee' });
  }
};
