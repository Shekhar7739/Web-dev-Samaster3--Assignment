const express = require('express');
const studentRoutes = require('./routes/studentRoutes');
const logger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable JSON request body parsing
app.use(express.json());

// Custom logger middleware
app.use(logger);

// Basic root route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Student Management REST API'
  });
});

// Mount student routes
app.use('/students', studentRoutes);

// 404 Route Not Found handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found'
  });
});

// Global error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
