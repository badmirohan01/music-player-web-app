require("dotenv").config();
const axios = require("axios");
const qs = require("querystring");

let access_token = null;

async function fetchSpotifyAccessToken() {
  const data = qs.stringify({
    grant_type: "client_credentials",
  });

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization:
      "Basic " +
      "NjU5MTk3YTAwYjYzNDI2OWEwMWEwY2NiODU3MmJlMjA6N2YxYjZmYzhmNzgzNDFjYTkwMTRkMTkwN2MzZTY3YTg=",
  };
  // console.log("base64 value:", headers.Authorization);
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      data,
      { headers }
    );
    access_token = response.data.access_token;
  } catch (error) {
    console.error(
      "Error fetching Spotify token:",
      error.response?.data || error.message
    );
    return null;
  }
}


const getSpotifyAccessToken = () => {
  if (!access_token) {
    return null;
  }
  return access_token;
};

module.exports = {
  fetchSpotifyAccessToken,
  getSpotifyAccessToken,
};
