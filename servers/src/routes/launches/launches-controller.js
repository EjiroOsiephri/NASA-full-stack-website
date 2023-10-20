const {
  getAllLaunches,
  addNewLaunches,
} = require("../../models/launches-model");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunches(req, res) {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.launchDate ||
    !launch.destination ||
    !launch.rocket
  ) {
    return res.status(400).json({
      error: "Bad request",
    });
  }

  launch.launchDate = new Date(launch.launchDate);
  addNewLaunches(launch);
  return res.status(201).json(launch);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunches,
};
