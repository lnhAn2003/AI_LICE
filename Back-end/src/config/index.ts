import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017',
  jwtSecret: process.env.JWT_SECRET || 'default-secret-key',
};
