const robotService = require("../services/robotService");

// Create a new robot
const createRobot = async (req, res, next) => {
  try {
    const robot = robotService.createRobot(req.body);
    res.status(201).json({
      success: true,
      data: robot,
    });
  } catch (error) {
    next(error);
  }
};

// Get all robots
const getAllRobots = async (req, res, next) => {
  try {
    const robots = robotService.getAllRobots();
    res.status(200).json({
      success: true,
      count: robots.length,
      data: robots,
    });
  } catch (error) {
    next(error);
  }
};

// Get robot by ID
const getRobotById = async (req, res, next) => {
  try {
    const robot = robotService.getRobotById(req.params.id);
    res.status(200).json({
      success: true,
      data: robot,
    });
  } catch (error) {
    next(error);
  }
};

// Update robot status
const updateRobotStatus = async (req, res, next) => {
  try {
    const robot = robotService.updateRobotStatus(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Robot status updated successfully",
      data: robot,
    });
  } catch (error) {
    next(error);
  }
};

// Delete robot
const deleteRobot = async (req, res, next) => {
  try {
    robotService.deleteRobot(req.params.id);
    res.status(200).json({
      success: true,
      message: "Robot deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRobot,
  getAllRobots,
  getRobotById,
  updateRobotStatus,
  deleteRobot,
};
