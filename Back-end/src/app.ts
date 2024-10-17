import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import topicRoutes from './routes/topics.router'

//Initialize express app
const app = express();

//middleware
app.use(cors());
app.use(bodyParser.json());

//mongodb connection
mongoose.connect('mongodb://localhost:27017/')
    .then(() => console.log('MongoDB Connected'))
    .catch(() => console.log('Failed to connect MongoDB'));

//routes
app.use('/api/topics', topicRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});