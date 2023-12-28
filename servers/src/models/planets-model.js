const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");
const planets = require("./planets.mongo");

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.6 &&
    planet["koi_insol"] < 1.1 &&
    planet["koi_prad"] < 1.6
  );
}

function getPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    ).pipe(
      parse({
        comment: "#",
        columns: true,
      })
    );

    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )

      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          savePlanets(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", async () => {
        // const planetsFound = await getAllPlanetsData();
        // const planetsFoundCount = planetsFound.length;
        // console.log(`We have ${planetsFoundCount} habitable planets`);
        resolve();
      });
  });
}

async function savePlanets(planet) {
  try {
    await planets.updateOne(
      { kepler_name: planet.kepler_name },
      { $set: planet },
      {
        upsert: true,
        maxTimeMS: 20000,
      }
    );
  } catch (error) {
    console.error(`Error updating planets: ${error}`);
  }
}

async function getAllPlanetsData() {
  return await planets.find({});
}

module.exports = {
  planet: getAllPlanetsData,
  getPlanetsData,
};
