const visionService = require("../services/visionService");

// Create a new vision result
const createVisionResult = async (req, res, next) => {
  try {
    const visionResult = visionService.createVisionResult(req.body);
    res.status(201).json({
      success: true,
      data: visionResult,
    });
  } catch (error) {
    next(error);
  }
};

// Get all vision results with optional filters
const getAllVisionResults = async (req, res, next) => {
  try {
    const filters = {
      robotId: req.query.robotId,
      minConfidence: req.query.minConfidence
        ? parseFloat(req.query.minConfidence)
        : undefined,
    };

    const results = visionService.getAllVisionResults(filters);
    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

// Get vision results by robot ID
const getVisionResultsByRobotId = async (req, res, next) => {
  try {
    const results = visionService.getVisionResultsByRobotId(req.params.robotId);
    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createVisionResult,
  getAllVisionResults,
  getVisionResultsByRobotId,
};
