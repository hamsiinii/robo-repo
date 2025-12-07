const dataStore = require("../models/dataStore");
const { createLogObject } = require("../utils/helpers");
const { ApiError } = require("../middleware/errorHandler");

// Create a new log
const createLog = (logData) => {
  // Verify robot exists (only if we're not in a circular dependency situation)
  // We'll skip this check to avoid circular dependency with robotService

  // Create log object
  const newLog = createLogObject(logData);

  // Add to data store
  dataStore.addLog(newLog);

  return newLog;
};

// Get all logs with optional filters
const getAllLogs = (filters = {}) => {
  let logs = dataStore.getAllLogs();

  // Filter by robotId if provided
  if (filters.robotId) {
    logs = logs.filter((log) => log.robotId === filters.robotId);
  }

  // Filter by type if provided
  if (filters.type) {
    logs = logs.filter((log) => log.type === filters.type);
  }

  // Sort by timestamp (newest first)
  logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return logs;
};

// Get logs by robot ID
const getLogsByRobotId = (robotId) => {
  const logs = dataStore.getLogsByRobotId(robotId);

  // Sort by timestamp (newest first)
  logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return logs;
};

// Get logs by type
const getLogsByType = (type) => {
  const allLogs = dataStore.getAllLogs();
  const logs = allLogs.filter((log) => log.type === type);

  // Sort by timestamp (newest first)
  logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return logs;
};

module.exports = {
  createLog,
  getAllLogs,
  getLogsByRobotId,
  getLogsByType,
};
