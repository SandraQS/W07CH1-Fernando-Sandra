const express = require("express");
const { getSeries } = require("../controllers/seriesControllers");

const router = express.Router();

router.get("/series", getSeries);

module.exports = router;
