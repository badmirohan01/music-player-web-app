const express = require("express");
const router = express.Router();

const { fetchAdData } = require("../controllers/ads");

router.get("/ads", fetchAdData);

module.exports = router;
