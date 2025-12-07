const { v4: uuidv4 } = require("uuid");

// Generate unique ID
const generateId = () => {
  return uuidv4();
};

// Validate robot type
const isValidRobotType = (type) => {
  const validTypes = [
    "warehouse",
    "delivery",
    "inspection",
    "cleaning",
    "security",
  ];
  return validTypes.includes(type.toLowerCase());
};

// Validate robot mode
const isValidMode = (mode) => {
  const validModes = ["idle", "charging", "active"];
  return validModes.includes(mode.toLowerCase());
};

// Validate battery percentage
const isValidBattery = (battery) => {
  return typeof battery === "number" && battery >= 0 && battery <= 100;
};

// Validate log type
const isValidLogType = (type) => {
  const validTypes = ["activity", "error", "status_change", "warning"];
  return validTypes.includes(type.toLowerCase());
};

// Format timestamp
const getCurrentTimestamp = () => {
  return new Date().toISOString();
};

// Create robot object
const createRobotObject = (data) => {
  return {
    id: generateId(),
    name: data.name,
    type: data.type.toLowerCase(),
    status: {
      mode: data.status?.mode || "idle",
      battery: data.status?.battery || 100,
      location: data.status?.location || { x: 0, y: 0, floor: "ground" },
      errorState: data.status?.errorState || null,
    },
    createdAt: getCurrentTimestamp(),
    updatedAt: getCurrentTimestamp(),
  };
};

// Create log object
const createLogObject = (data) => {
  return {
    id: generateId(),
    robotId: data.robotId,
    type: data.type.toLowerCase(),
    message: data.message,
    data: data.data || {},
    timestamp: getCurrentTimestamp(),
  };
};

// Create vision result object
const createVisionResultObject = (data) => {
  return {
    id: generateId(),
    robotId: data.robotId,
    imageUrl: data.imageUrl || "",
    detections: data.detections || [],
    confidence: data.confidence || 0,
    timestamp: getCurrentTimestamp(),
  };
};

module.exports = {
  generateId,
  isValidRobotType,
  isValidMode,
  isValidBattery,
  isValidLogType,
  getCurrentTimestamp,
  createRobotObject,
  createLogObject,
  createVisionResultObject,
};
