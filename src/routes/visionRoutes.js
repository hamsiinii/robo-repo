const express = require("express");
const router = express.Router();
const visionController = require("../controllers/visionController");
const { validateVisionResult } = require("../middleware/validator");

// POST /api/vision/results - Create a new vision result
router.post(
  "/results",
  validateVisionResult,
  visionController.createVisionResult
);

// GET /api/vision/results - Get all vision results (with optional filters)
router.get("/results", visionController.getAllVisionResults);

// GET /api/vision/results/:robotId - Get vision results by robot ID
router.get("/results/:robotId", visionController.getVisionResultsByRobotId);

module.exports = router;
