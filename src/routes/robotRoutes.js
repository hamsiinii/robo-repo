const express = require("express");
const router = express.Router();
const robotController = require("../controllers/robotController");
const {
  validateRobotCreation,
  validateStatusUpdate,
} = require("../middleware/validator");

// POST /api/robots - Create a new robot
router.post("/", validateRobotCreation, robotController.createRobot);

// GET /api/robots - Get all robots
router.get("/", robotController.getAllRobots);

// GET /api/robots/:id - Get robot by ID
router.get("/:id", robotController.getRobotById);

// PATCH /api/robots/:id/status - Update robot status
router.patch(
  "/:id/status",
  validateStatusUpdate,
  robotController.updateRobotStatus
);

// DELETE /api/robots/:id - Delete robot
router.delete("/:id", robotController.deleteRobot);

module.exports = router;
