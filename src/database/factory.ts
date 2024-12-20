import { dbRun } from './db';
import { Employee, Device } from '../entities/types';

const employees: Employee[] = [
  {
    name: 'John Doe',
    role: 'Software Engineer'
  },
  {
    name: 'Jane Smith',
    role: 'Product Manager'
  }
];

const devices: (Omit<Device, 'id'> & { owner_name: string })[] = [
  {
    device_name: 'MacBook Pro M1',
    type: 'Laptop',
    owner_name: 'John Doe'
  },
  {
    device_name: 'iPhone 13 Pro',
    type: 'Mobile',
    owner_name: 'Jane Smith'
  }
];

export const seedDatabase = async (): Promise<void> => {
  try {
    console.log('Starting database seeding...');

    // Insert employees
    for (const employee of employees) {
      const result = await dbRun<[string, string]>(
        'INSERT INTO employees (name, role) VALUES (?, ?)',
        [employee.name, employee.role]
      );
      console.log(`Created employee ${employee.name} with ID ${result.lastID}`);
    }

    // Get employee IDs by their names
    const employeeMap = new Map<string, number>();
    
    for (const employee of employees) {
      const result = await dbRun<[string], { id: number }>(
        'SELECT id FROM employees WHERE name = ?',
        [employee.name]
      );
      if (result.lastID) {
        employeeMap.set(employee.name, result.lastID);
      }
    }

    // Insert devices with owner IDs
    for (const device of devices) {
      const ownerId = employeeMap.get(device.owner_name);
      if (ownerId) {
        const result = await dbRun<[string, string, number]>(
          'INSERT INTO devices (device_name, type, owner_id) VALUES (?, ?, ?)',
          [device.device_name, device.type, ownerId]
        );
        console.log(`Created device ${device.device_name} with ID ${result.lastID}`);
      }
    }

    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};
