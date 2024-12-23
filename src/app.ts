import express from 'express';
import cors from 'cors';
import { initDb } from './database/db';
import { seedDatabase } from './database/factory';
import routes from './routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mount all routes
app.use('/api', routes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;

// Start server
const startServer = async () => {
  try {
    // Initialize database tables
    await initDb();
    console.log('Database initialized successfully');

    // Seed database with initial data
    await seedDatabase();
    console.log('Database seeded successfully');

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
