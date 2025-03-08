import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
try {
  const uri = process.env.MONGODB_URI;
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Add timeout
    retryWrites: true,
    w: 'majority'
  });
  console.log('Connected to MongoDB successfully');
} catch (err) {
  console.error('MongoDB connection error:', err);
  console.error('Connection string:', process.env.MONGODB_URI);
  process.exit(1); // Exit process with failure
}

// Routes
import authRoutes from './routes/auth.js';
app.use('/api/users', authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});