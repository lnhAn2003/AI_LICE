import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import morgan from 'morgan';

//export Routes
import userRoutes from './routes/user.routes';
import roleRoutes from './routes/role.routes';
import threadRoutes from './routes/thread.routes';
import postRoutes from './routes/post.routes';
import commentRoutes from './routes/comment.routes';
import categoryRoutes from './routes/category.routes';
import gamesharedRoutes from './routes/gameshared.routes';
import courseRoutes from './routes/course.routes';
import aiRoutes from './routes/ai.routes';

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/users', userRoutes);
app.use('/threads', threadRoutes);
app.use('/roles', roleRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/categories', categoryRoutes);
app.use('/gameshared', gamesharedRoutes);
app.use('/course', courseRoutes);
app.use('/ai', aiRoutes);

// Database Connection
mongoose
  .connect(config.mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start Server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
