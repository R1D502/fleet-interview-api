import { Request, Response } from 'express';
import { dbAll, dbGet, dbRun } from '../database/db';
import { Device, DeviceRow, EmployeeRow } from '../entities/types';

export const getAllDevices = async (req: Request, res: Response): Promise<void> => {
  try {
    const devices = await dbAll<[], DeviceRow>('SELECT * FROM devices');
    res.json(devices);
  } catch (error) {
    console.error('Error getting devices:', error);
    res.status(500).json({ error: 'Failed to get devices' });
  }
};

export const getDeviceById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const device = await dbGet<[string], DeviceRow>(
      'SELECT * FROM devices WHERE id = ?',
      [id]
    );
    
    if (!device) {
      res.status(404).json({ error: 'Device not found' });
    }
    
    res.json(device);
  } catch (error) {
    console.error('Error getting device:', error);
    res.status(500).json({ error: 'Failed to get device' });
  }
};

export const createDevice = async (req: Request, res: Response): Promise<void> => {
  try {
    const { device_name, type, owner_id } = req.body as Device;
    
    if (!device_name || !type) {
       res.status(400).json({ error: 'Device name and type are required' });
    }

    if (owner_id) {
      const owner = await dbGet<[number], EmployeeRow>(
        'SELECT * FROM employees WHERE id = ?',
        [owner_id]
      );
      if (!owner) {
         res.status(400).json({ error: 'Invalid owner_id' });
      }
    }

    const result = await dbRun<[string, string, number | null]>(
      'INSERT INTO devices (device_name, type, owner_id) VALUES (?, ?, ?)',
      [device_name, type, owner_id || null]
    );

    res.status(201).json({ 
      id: result.lastID, 
      device_name, 
      type, 
      owner_id: owner_id || null 
    });
  } catch (error) {
    console.error('Error creating device:', error);
    res.status(500).json({ error: 'Failed to create device' });
  }
};

export const updateDevice = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { device_name, type, owner_id } = req.body as Device;

    if (!device_name || !type) {
       res.status(400).json({ error: 'Device name and type are required' });
    }

    const device = await dbGet<[string], DeviceRow>(
      'SELECT * FROM devices WHERE id = ?',
      [id]
    );

    if (!device) {
       res.status(404).json({ error: 'Device not found' });
    }

    if (owner_id) {
      const owner = await dbGet<[number], EmployeeRow>(
        'SELECT * FROM employees WHERE id = ?',
        [owner_id]
      );
      if (!owner) {
         res.status(400).json({ error: 'Invalid owner_id' });
      }
    }

    await dbRun<[string, string, number | null, string]>(
      'UPDATE devices SET device_name = ?, type = ?, owner_id = ? WHERE id = ?',
      [device_name, type, owner_id || null, id]
    );

    res.json({ 
      id: Number(id), 
      device_name, 
      type, 
      owner_id: owner_id || null 
    });
  } catch (error) {
    console.error('Error updating device:', error);
    res.status(500).json({ error: 'Failed to update device' });
  }
};

export const deleteDevice = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const device = await dbGet<[string], DeviceRow>(
      'SELECT * FROM devices WHERE id = ?',
      [id]
    );

    if (!device) {
       res.status(404).json({ error: 'Device not found' });
    }

    await dbRun<[string]>('DELETE FROM devices WHERE id = ?', [id]);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting device:', error);
    res.status(500).json({ error: 'Failed to delete device' });
  }
};
