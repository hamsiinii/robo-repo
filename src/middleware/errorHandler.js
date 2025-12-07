// Custom error class
class ApiError extends Error {
  constructor(statusCode, message, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

// Error handler middleware
const errorHandler = (err, req, res, next) => {
  // Default to 500 if no status code is set
  const statusCode = err.statusCode || 500;

  // Log error for debugging (in production, use proper logging)
  console.error(`[ERROR] ${err.message}`, err.details || "");

  // Send error response
  res.status(statusCode).json({
    error: {
      code: getErrorCode(statusCode),
      message: err.message,
      ...(err.details && { details: err.details }),
    },
  });
};

// Get error code based on status
const getErrorCode = (statusCode) => {
  const errorCodes = {
    400: "BAD_REQUEST",
    404: "NOT_FOUND",
    409: "CONFLICT",
    500: "INTERNAL_SERVER_ERROR",
  };

  return errorCodes[statusCode] || "UNKNOWN_ERROR";
};

// 404 handler for undefined routes
const notFoundHandler = (req, res, next) => {
  const error = new ApiError(404, `Route ${req.originalUrl} not found`);
  next(error);
};

module.exports = {
  ApiError,
  errorHandler,
  notFoundHandler,
};
