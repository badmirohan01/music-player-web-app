const express = require("express");
const router = express.Router();

const {
  fetchSpotifyAccessToken,
  getSpotifyAccessToken,
} = require("../services/spotifyAT");
const axios = require("axios");

fetchSpotifyAccessToken().then(() => console.log("access token fetched"));

router.get("/albums/:id", async (req, res) => {
  try {
    const accessToken = getSpotifyAccessToken();
    // console.log(accessToken);
    const response = await axios.get(
      `https://api.spotify.com/v1/albums/${req.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    if (error.status === 401) {
      console.error("Access token expired, fetching a new one...");
      access_token = await fetchSpotifyAccessToken();
    }
  }
});

router.get("/tracks/:id", async (req, res) => {
  // res.json({ queue });
  const trackUrl = `http://localhost:3000/tracks/${req.params.id}.mp3`;
  try {
    const accessToken = getSpotifyAccessToken();
    const response = await axios.get(
      `https://api.spotify.com/v1/tracks/${req.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    res.setHeader("Content-Type", "audio/mpeg");
    res.json({ ...response.data, trackUrl });
  } catch (error) {
    console.error("Error fetching tracks:", error);
    res.status(500).json({ error: "Failed to fetch tracks" });
  }
});

// router.get("/tracks/:id", async (req, res) => {
// })

module.exports = router;
