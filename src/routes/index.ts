import { Router } from 'express';
import employeeRoutes from './employeeRoutes';
import deviceRoutes from './deviceRoutes';

const router = Router();

// Mount routes
router.use('/employees', employeeRoutes);
router.use('/devices', deviceRoutes);

export default router;
