import app from './app';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

// Start the server
const server = app.listen(PORT, () => {
  console.log(`
  ╔═════════════════════════════════════════════════╗
  ║                                                 ║
  ║   Vaisala Weather Service - Server Started      ║
  ║                                                 ║
  ║   Server running on http://localhost:${PORT}      ║
  ║   Health check: http://localhost:${PORT}/health   ║
  ║                                                 ║
  ╚═════════════════════════════════════════════════╝
  `);
});

// Handle graceful shutdown
const signals = ['SIGINT', 'SIGTERM'];
signals.forEach(signal => {
  process.on(signal, () => {
    console.log(`${signal} received. Shutting down gracefully...`);
    server.close(() => {
      console.log('Server closed.');
      process.exit(0);
    });
  });
});

// This process will keep running as long as the server is active
console.log('Main application process is now running');