const planets = require("../../models/planets-model");

function getPlanetsData(req, res) {
  return res.status(200).json(planets);
}

module.exports = getPlanetsData;
