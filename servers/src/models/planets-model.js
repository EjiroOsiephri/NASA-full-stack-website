const { parse } = require("csv-parse");
const fs = require("fs");

const planet = [];

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.6 &&
    planet["koi_insol"] < 1.1 &&
    planet["koi_prad"] < 1.6
  );
}

fs.createReadStream("kepler_data.csv").pipe(
  parse({
    comment: "#",
    columns: true,
  })
);

fs.createReadStream("kepler_data.csv")
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
  })
  .on("end", () => {
    console.log(`We have ${planet.length} habitable planet`);
  });

module.exports = planet;
