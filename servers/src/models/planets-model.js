const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");

const planet = [];

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

      .on("data", (data) => {
        if (isHabitablePlanet(data)) {
          planet.push(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", () => {
        console.log(`We have ${planet.length} habitable planet`);
        resolve();
      });
  });
}

module.exports = {
  planet,
  getPlanetsData,
};
