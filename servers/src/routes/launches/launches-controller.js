const {
  getAllLaunches,
  addNewLaunches,
  existLaunchWithId,
  abortLaunchWithId,
} = require("../../models/launches-model");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunches(req, res) {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.launchDate ||
    !launch.target ||
    !launch.rocket
  ) {
    return res.status(400).json({
      error: "Bad request",
    });
  }

  launch.launchDate = new Date(launch.launchDate);

  if (launch.launchDate.toString() === "Invalid Date") {
    return res.status(400).json({
      error: "Wahala for you ooo, incorrect date",
    });
  }

  addNewLaunches(launch);
  return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  const launchId = +req.params.id;

  if (!existLaunchWithId(launchId)) {
    return res.status(404).json({
      error: "Not Found",
    });
  }
  const aborted = abortLaunchWithId(launchId);

  return res.status(200).json(aborted);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunches,
  httpAbortLaunch,
};
