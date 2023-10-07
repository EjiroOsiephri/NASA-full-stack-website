const { planet } = require("../../models/planets-model");

function getPlanetsData(req, res) {
  return res.status(200).json(planet);
}

module.exports = getPlanetsData;
