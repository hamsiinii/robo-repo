const {
  isValidRobotType,
  isValidMode,
  isValidBattery,
  isValidLogType,
} = require("../utils/helpers");
const { ApiError } = require("./errorHandler");

// Validate robot creation
const validateRobotCreation = (req, res, next) => {
  const { name, type, status } = req.body;

  // Check required fields
  if (!name || !type) {
    return next(new ApiError(400, "Name and type are required fields"));
  }

  // Validate name
  if (typeof name !== "string" || name.trim().length === 0) {
    return next(new ApiError(400, "Name must be a non-empty string"));
  }

  // Validate type
  if (!isValidRobotType(type)) {
    return next(
      new ApiError(
        400,
        "Invalid robot type. Valid types: warehouse, delivery, inspection, cleaning, security"
      )
    );
  }

  // Validate status if provided
  if (status) {
    if (status.mode && !isValidMode(status.mode)) {
      return next(
        new ApiError(400, "Invalid mode. Valid modes: idle, charging, active")
      );
    }

    if (status.battery !== undefined && !isValidBattery(status.battery)) {
      return next(
        new ApiError(400, "Battery must be a number between 0 and 100")
      );
    }
  }

  next();
};

// Validate status update
const validateStatusUpdate = (req, res, next) => {
  const { mode, battery, location, errorState } = req.body;

  // Check if at least one field is provided
  if (!mode && battery === undefined && !location && errorState === undefined) {
    return next(
      new ApiError(
        400,
        "At least one status field must be provided (mode, battery, location, errorState)"
      )
    );
  }

  // Validate mode if provided
  if (mode && !isValidMode(mode)) {
    return next(
      new ApiError(400, "Invalid mode. Valid modes: idle, charging, active")
    );
  }

  // Validate battery if provided
  if (battery !== undefined && !isValidBattery(battery)) {
    return next(
      new ApiError(400, "Battery must be a number between 0 and 100")
    );
  }

  // Validate location if provided
  if (location) {
    if (typeof location.x !== "number" || typeof location.y !== "number") {
      return next(
        new ApiError(400, "Location must have numeric x and y coordinates")
      );
    }
  }

  next();
};

// Validate log creation
const validateLogCreation = (req, res, next) => {
  const { robotId, type, message } = req.body;

  // Check required fields
  if (!robotId || !type || !message) {
    return next(
      new ApiError(400, "robotId, type, and message are required fields")
    );
  }

  // Validate type
  if (!isValidLogType(type)) {
    return next(
      new ApiError(
        400,
        "Invalid log type. Valid types: activity, error, status_change, warning"
      )
    );
  }

  // Validate message
  if (typeof message !== "string" || message.trim().length === 0) {
    return next(new ApiError(400, "Message must be a non-empty string"));
  }

  next();
};

// Validate vision result creation
const validateVisionResult = (req, res, next) => {
  const { robotId, detections, confidence } = req.body;

  // Check required fields
  if (!robotId) {
    return next(new ApiError(400, "robotId is required"));
  }

  // Validate detections if provided
  if (detections && !Array.isArray(detections)) {
    return next(new ApiError(400, "detections must be an array"));
  }

  // Validate confidence if provided
  if (confidence !== undefined) {
    if (typeof confidence !== "number" || confidence < 0 || confidence > 1) {
      return next(
        new ApiError(400, "confidence must be a number between 0 and 1")
      );
    }
  }

  next();
};

module.exports = {
  validateRobotCreation,
  validateStatusUpdate,
  validateLogCreation,
  validateVisionResult,
};
