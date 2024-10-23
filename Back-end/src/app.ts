import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import morgan from 'morgan';

import userRoutes from './routes/user.routes';
import threadRoutes from './routes/thread.routes';

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/users', userRoutes);
app.use('/threads', threadRoutes);

// Database Connection
mongoose
  .connect(config.mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start Server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
