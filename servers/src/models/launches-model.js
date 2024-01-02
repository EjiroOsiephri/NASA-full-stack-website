const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");
const axios = require("axios");

let DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  launchDate: new Date("December 27 2030"),
  target: "Kepler-442 b",
  rocket: "Rocket ss1",
  customer: ["nasa", "Ejiro"],
  upcoming: true,
  success: true,
};

const SPACE_X_URL = "https://api.spacexdata.com/v4/launches/query";

async function findLaunch(filter) {
  return await launchesDatabase.findOne(filter);
}

async function populateLaunches() {
  console.log("Loading data....");
  const response = await axios.post(
    SPACE_X_URL,

    {
      query: {},
      options: {
        pagination: false,
        populate: [
          {
            path: "rocket",
            select: {
              name: 1,
            },
          },
          {
            path: "payloads",
            select: {
              customers: 1,
            },
          },
        ],
      },
    }
  );
  const launchDocs = response.data.docs;

  if (response.status !== 200) {
    console.log("Problem downloading launches data");
    throw new Error("Launch data download failed");
  }

  for (const launchDoc of launchDocs) {
    const payloads = launchDoc["payloads"];
    const customers = payloads.flatMap((payload) => {
      return payload["customers"];
    });

    const launch = {
      flightNumber: launchDoc["flight_number"],
      mission: launchDoc["name"],
      rocket: launchDoc["rocket"]["name"],
      launchDate: launchDoc["date_local"],
      success: launchDoc["success"],
      customers,
    };
    console.log(`${launch.flightNumber} ${launch.mission}`);

    await saveLaunch(launch);
  }
}

async function getLaunchesData() {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });
  if (firstLaunch) {
    console.log("Lauch Data already loaded");
  } else {
    await populateLaunches();
  }
}

async function existLaunchWithId(launchId) {
  return await findLaunch({
    flightNumber: launchId,
  });
}

saveLaunch(launch);

async function saveLaunch(launch) {
  await launchesDatabase.findOneAndUpdate(
    { flightNumber: launch.flightNumber },
    launch,
    {
      upsert: true,
    }
  );
}

async function getLatestFlightNumber() {
  const latestFlightNumber = await launchesDatabase
    .findOne()
    .sort("-flightNumber");

  if (!latestFlightNumber) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestFlightNumber.flightNumber;
}

async function getAllLaunches(skip, limit) {
  return await launchesDatabase
    .find({}, { _id: 0, _v1: 0 })
    .skip(skip)
    .limit(limit);
}

async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;

  const planet = await planets.findOne({
    kepler_name: launch.target,
  });

  if (!planet) {
    throw new Error("No matching planets found");
  }

  const newLaunch = Object.assign(launch, {
    flightNumber: newFlightNumber,
    success: true,
    upcoming: true,
    customer: ["ztm", "NASA"],
  });

  await saveLaunch(newLaunch);
}

async function abortLaunchWithId(launchId) {
  const aborted = await launchesDatabase.updateOne(
    {
      flightNumber: launchId,
    },
    { upcoming: false, success: false }
  );
  return aborted.ok === 1 && aborted.nModified === 1;
}

module.exports = {
  getLaunchesData,
  getAllLaunches,
  scheduleNewLaunch,
  existLaunchWithId,
  abortLaunchWithId,
};
