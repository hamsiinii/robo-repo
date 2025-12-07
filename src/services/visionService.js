const dataStore = require("../models/dataStore");
const { createVisionResultObject } = require("../utils/helpers");
const { ApiError } = require("../middleware/errorHandler");
const logService = require("./logService");

// Create a new vision result
const createVisionResult = (visionData) => {
  // Verify robot exists
  const robot = dataStore.getRobotById(visionData.robotId);

  if (!robot) {
    throw new ApiError(404, "Robot not found", { robotId: visionData.robotId });
  }

  // Create vision result object
  const newVisionResult = createVisionResultObject(visionData);

  // Add to data store
  dataStore.addVisionResult(newVisionResult);

  // Create activity log
  const detectionCount = newVisionResult.detections.length;
  logService.createLog({
    robotId: visionData.robotId,
    type: "activity",
    message: `Vision analysis completed: ${detectionCount} detection(s) found`,
    data: {
      confidence: newVisionResult.confidence,
      detectionCount: detectionCount,
    },
  });

  return newVisionResult;
};

// Get all vision results with optional filters
const getAllVisionResults = (filters = {}) => {
  let results = dataStore.getAllVisionResults();

  // Filter by robotId if provided
  if (filters.robotId) {
    results = results.filter((result) => result.robotId === filters.robotId);
  }

  // Filter by minimum confidence if provided
  if (filters.minConfidence !== undefined) {
    results = results.filter(
      (result) => result.confidence >= filters.minConfidence
    );
  }

  // Sort by timestamp (newest first)
  results.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return results;
};

// Get vision results by robot ID
const getVisionResultsByRobotId = (robotId) => {
  // Verify robot exists
  const robot = dataStore.getRobotById(robotId);

  if (!robot) {
    throw new ApiError(404, "Robot not found", { robotId: robotId });
  }

  const results = dataStore.getVisionResultsByRobotId(robotId);

  // Sort by timestamp (newest first)
  results.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return results;
};

module.exports = {
  createVisionResult,
  getAllVisionResults,
  getVisionResultsByRobotId,
};
