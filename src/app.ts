import express from 'express';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Simple middleware to log requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Root endpoint - Hello World
app.get('/', (req, res) => {
  res.json({
    message: 'Hello, World!',
    service: 'Vaisala Weather Service',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Service is running',
    environment: process.env.NODE_ENV || 'development'
  });
});

// We don't start the server here anymore - only in server.ts
// This prevents the port conflict (EADDRINUSE)

export default app;