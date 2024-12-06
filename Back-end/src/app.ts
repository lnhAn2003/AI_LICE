import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import morgan from 'morgan';
import cors from 'cors';
import http from 'http';

import { initializeSocketServer } from './ioserver';

import userRoutes from './routes/user.routes';
import roleRoutes from './routes/role.routes';
import threadRoutes from './routes/thread.routes';
import postRoutes from './routes/post.routes';
import commentRoutes from './routes/comment.routes';
import categoryRoutes from './routes/category.routes';
import gamesharedRoutes from './routes/gameshared.routes';
import aiRoutes from './routes/ai.routes';
import logRoutes from './routes/log.routes';
import notificationRoutes from './routes/notification.routes';
import newsRoutes from './routes/news.routes';
import courseRoutes from './routes/course.routes';
import sectionRoutes from './routes/section.routes';
import lessonRoutes from './routes/lesson.routes'
import progressRoutes from './routes/progress.routes'

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// Routes
app.use('/users', userRoutes);
app.use('/threads', threadRoutes);
app.use('/roles', roleRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/categories', categoryRoutes);
app.use('/gameshareds', gamesharedRoutes);
app.use('/ai', aiRoutes);
app.use('/logs', logRoutes);
app.use('/notification', notificationRoutes);
app.use('/news', newsRoutes);
app.use('/courses', courseRoutes);
app.use('/sections', sectionRoutes);
app.use('/lessons', lessonRoutes);
app.use('/progress', progressRoutes);

// Database Connection
mongoose
  .connect(config.mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Create an HTTP server
const httpServer = http.createServer(app);

// Initialize Socket.IO server
initializeSocketServer(httpServer);

// Start Server
httpServer.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
