const { planet } = require("../../models/planets-model");

async function getPlanetsData(req, res) {
  return res.status(200).json(await planet());
}

module.exports = getPlanetsData;
