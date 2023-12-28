// const launches = require("./launches.mongo");

const launches = new Map();

let latestLaunch = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  launchDate: new Date("December 27 2030"),
  target: "Kepler 442 -b",
  rocket: "Rocket ss1",
  customer: ["nasa", "Ejiro"],
  upcoming: true,
  success: true,
};

function existLaunchWithId(launchId) {
  return launches.has(launchId);
}

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunches(launch) {
  latestLaunch++;
  launches.set(
    latestLaunch,
    Object.assign(launch, {
      flightNumber: latestLaunch,
      success: true,
      upcoming: true,
      customer: ["ztm", "NASA"],
    })
  );
}

function abortLaunchWithId(launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

module.exports = {
  getAllLaunches,
  addNewLaunches,
  existLaunchWithId,
  abortLaunchWithId,
};
