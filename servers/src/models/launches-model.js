const launches = new Map();

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  launchDate: new Date("December 27 2030"),
  destination: "Kepler 442 -b",
  customer: ["nasa", "Ejiro"],
  rocket: "Rocket ss1",
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

module.exports = {
  launches,
};
