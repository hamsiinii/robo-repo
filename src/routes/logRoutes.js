const express = require("express");
const router = express.Router();
const logController = require("../controllers/logController");
const { validateLogCreation } = require("../middleware/validator");

// POST /api/logs - Create a new log
router.post("/", validateLogCreation, logController.createLog);

// GET /api/logs - Get all logs (with optional filters via query params)
router.get("/", logController.getAllLogs);

// GET /api/logs/:robotId - Get logs by robot ID
router.get("/:robotId", logController.getLogsByRobotId);

module.exports = router;
