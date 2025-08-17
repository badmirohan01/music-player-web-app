const express = require("express");
const router = express.Router();

const {
  fetchAlbumData,
  fetchTrackData,
} = require("../controllers/fetchSpotifyData");

router.get("/albums/:id", fetchAlbumData);

router.get("/tracks/:id", fetchTrackData);

module.exports = router;
