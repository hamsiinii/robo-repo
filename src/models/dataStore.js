const dataStore = {
  robots: [],
  logs: [],
  visionResults: [],
};

const getAllRobots = () => {
  return dataStore.robots;
};

const getRobotById = (id) => {
  return dataStore.robots.find((robot) => robot.id === id);
};

const addRobot = (robot) => {
  dataStore.robots.push(robot);
  return robot;
};

const updateRobot = (id, updates) => {
  const index = dataStore.robots.findIndex((robot) => robot.id === id);
  if (index === -1) return null;

  dataStore.robots[index] = { ...dataStore.robots[index], ...updates };
  return dataStore.robots[index];
};

const deleteRobot = (id) => {
  const index = dataStore.robots.findIndex((robot) => robot.id === id);
  if (index === -1) return false;

  dataStore.robots.splice(index, 1);
  return true;
};

const getAllLogs = () => {
  return dataStore.logs;
};

const getLogsByRobotId = (robotId) => {
  return dataStore.logs.filter((log) => log.robotId === robotId);
};

const addLog = (log) => {
  dataStore.logs.push(log);
  return log;
};

const getAllVisionResults = () => {
  return dataStore.visionResults;
};

const getVisionResultsByRobotId = (robotId) => {
  return dataStore.visionResults.filter((result) => result.robotId === robotId);
};

const addVisionResult = (result) => {
  dataStore.visionResults.push(result);
  return result;
};

module.exports = {
  // Robot ops
  getAllRobots,
  getRobotById,
  addRobot,
  updateRobot,
  deleteRobot,

  getAllLogs,
  getLogsByRobotId,
  addLog,

  getAllVisionResults,
  getVisionResultsByRobotId,
  addVisionResult,
};
