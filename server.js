require("dotenv").config();
const express = require("express");
const {
  errorHandler,
  notFoundHandler,
} = require("./src/middleware/errorHandler");

// Import routes
const robotRoutes = require("./src/routes/robotRoutes");
const visionRoutes = require("./src/routes/visionRoutes");
const logRoutes = require("./src/routes/logRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Basic health check route
app.get("/", (req, res) => {
  res.json({
    message: "Robot Management API",
    version: "1.0.0",
    status: "running",
    endpoints: {
      robots: "/api/robots",
      vision: "/api/vision/results",
      logs: "/api/logs",
    },
  });
});

// API Routes
app.use("/api/robots", robotRoutes);
app.use("/api/vision", visionRoutes);
app.use("/api/logs", logRoutes);

// 404 handler - must be after all routes
app.use(notFoundHandler);

// Error handling middleware - must be last
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Robot API Server running on port ${PORT}`);
  console.log(` Environment: ${process.env.NODE_ENV}`);
  console.log(` API Base URL: http://localhost:${PORT}`);
});
