const logService = require("../services/logService");

// Create a new log
const createLog = async (req, res, next) => {
  try {
    const log = logService.createLog(req.body);
    res.status(201).json({
      success: true,
      data: log,
    });
  } catch (error) {
    next(error);
  }
};

// Get all logs with optional filters
const getAllLogs = async (req, res, next) => {
  try {
    const filters = {
      robotId: req.query.robotId,
      type: req.query.type,
    };

    const logs = logService.getAllLogs(filters);
    res.status(200).json({
      success: true,
      count: logs.length,
      data: logs,
    });
  } catch (error) {
    next(error);
  }
};

// Get logs by robot ID
const getLogsByRobotId = async (req, res, next) => {
  try {
    const logs = logService.getLogsByRobotId(req.params.robotId);
    res.status(200).json({
      success: true,
      count: logs.length,
      data: logs,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createLog,
  getAllLogs,
  getLogsByRobotId,
};
