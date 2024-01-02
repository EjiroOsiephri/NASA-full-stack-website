const {
  getAllLaunches,
  scheduleNewLaunch,
  existLaunchWithId,
  abortLaunchWithId,
} = require("../../models/launches-model");

const { pagination } = require("../../services/query");

async function httpGetAllLaunches(req, res) {
  const { skip, limit } = pagination(req.query);

  const launches = await getAllLaunches(skip, limit);

  return res.status(200).json(launches);
}

async function httpAddNewLaunches(req, res) {
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

  await scheduleNewLaunch(launch);
  return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
  const launchId = +req.params.id;

  const existLaunch = await existLaunchWithId(launchId);

  if (!existLaunch) {
    return res.status(404).json({
      error: "Not Found",
    });
  }

  const aborted = await abortLaunchWithId(launchId);

  if (aborted) {
    return res.status(400).json({
      error: "Launch not aborted",
    });
  }
  return res.status(200).json({
    ok: true,
  });
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunches,
  httpAbortLaunch,
};
