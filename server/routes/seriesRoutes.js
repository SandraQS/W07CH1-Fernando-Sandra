const express = require("express");
const {
  getSeries,
  getSeriesViewed,
} = require("../controllers/seriesControllers");

const router = express.Router();

router.get("/", getSeries);
router.get("/viewed", getSeriesViewed);

module.exports = router;
