const dataStore = require("../models/dataStore");
const { createRobotObject, getCurrentTimestamp } = require("../utils/helpers");
const { ApiError } = require("../middleware/errorHandler");
const logService = require("./logService");

// Create a new robot
const createRobot = (robotData) => {
  // Check if robot with same name already exists
  const existingRobot = dataStore
    .getAllRobots()
    .find((r) => r.name.toLowerCase() === robotData.name.toLowerCase());

  if (existingRobot) {
    throw new ApiError(409, "A robot with this name already exists", {
      name: robotData.name,
    });
  }

  // Create robot object
  const newRobot = createRobotObject(robotData);

  // Add to data store
  dataStore.addRobot(newRobot);

  // Create activity log
  logService.createLog({
    robotId: newRobot.id,
    type: "activity",
    message: `Robot ${newRobot.name} registered successfully`,
    data: { type: newRobot.type },
  });

  return newRobot;
};

// Get all robots
const getAllRobots = () => {
  return dataStore.getAllRobots();
};

// Get robot by ID
const getRobotById = (id) => {
  const robot = dataStore.getRobotById(id);

  if (!robot) {
    throw new ApiError(404, "Robot not found", { robotId: id });
  }

  return robot;
};

// Update robot status
const updateRobotStatus = (id, statusUpdates) => {
  // Check if robot exists
  const robot = dataStore.getRobotById(id);

  if (!robot) {
    throw new ApiError(404, "Robot not found", { robotId: id });
  }

  // Prepare updated status
  const updatedStatus = {
    ...robot.status,
    ...statusUpdates,
  };

  // Update robot
  const updatedRobot = dataStore.updateRobot(id, {
    status: updatedStatus,
    updatedAt: getCurrentTimestamp(),
  });

  // Create status change log
  const changes = Object.keys(statusUpdates).join(", ");
  logService.createLog({
    robotId: id,
    type: "status_change",
    message: `Robot status updated: ${changes}`,
    data: statusUpdates,
  });

  // If error state is set, create error log
  if (statusUpdates.errorState) {
    logService.createLog({
      robotId: id,
      type: "error",
      message: `Robot error: ${statusUpdates.errorState}`,
      data: { errorState: statusUpdates.errorState },
    });
  }

  return updatedRobot;
};

// Delete robot
const deleteRobot = (id) => {
  // Check if robot exists
  const robot = dataStore.getRobotById(id);

  if (!robot) {
    throw new ApiError(404, "Robot not found", { robotId: id });
  }

  // Delete robot
  const deleted = dataStore.deleteRobot(id);

  if (deleted) {
    // Create activity log
    logService.createLog({
      robotId: id,
      type: "activity",
      message: `Robot ${robot.name} deleted`,
      data: { name: robot.name },
    });
  }

  return deleted;
};

module.exports = {
  createRobot,
  getAllRobots,
  getRobotById,
  updateRobotStatus,
  deleteRobot,
};
