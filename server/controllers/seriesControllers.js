const Serie = require("../../database/models/series");

const getSeries = async (req, res) => {
  const series = await Serie.find();
  res.json(series);
};

const getSeriesViewed = async (req, res, next) => {
  try {
    const viewedSerie = await Serie.find({ viewed: true });
    if (viewedSerie) {
      res.json(viewedSerie);
    } else {
      const error = new Error("Serie no encontrada");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    next(error);
  }
};

module.exports = { getSeries, getSeriesViewed };
