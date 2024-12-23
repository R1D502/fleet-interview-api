import { Router } from 'express';
import * as deviceController from '../controllers/deviceController';

const router = Router();

// GET /devices - Get all devices
router.get('/', deviceController.getAllDevices);

// GET /devices/:id - Get a specific device
router.get('/:id', deviceController.getDeviceById);

// POST /devices - Create a new device
router.post('/', deviceController.createDevice);

// PUT /devices/:id - Update a device
router.put('/:id', deviceController.updateDevice);

// DELETE /devices/:id - Delete a device
router.delete('/:id', deviceController.deleteDevice);

export default router;
