import express from 'express';
import cors from 'cors';
import { initDb } from './database/db';
import * as employeeController from './controllers/employeeController';
import * as deviceController from './controllers/deviceController';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Employee routes
app.get('/employees', employeeController.getAllEmployees);
app.get('/employees/:id', employeeController.getEmployeeById);
app.post('/employees', employeeController.createEmployee);
app.put('/employees/:id', employeeController.updateEmployee);
app.delete('/employees/:id', employeeController.deleteEmployee);

// Device routes
app.get('/devices', deviceController.getAllDevices);
app.get('/devices/:id', deviceController.getDeviceById);
app.post('/devices', deviceController.createDevice);
app.put('/devices/:id', deviceController.updateDevice);
app.delete('/devices/:id', deviceController.deleteDevice);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const startServer = async () => {
  try {
    await initDb();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
