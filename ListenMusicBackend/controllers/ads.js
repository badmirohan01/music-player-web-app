const { getRandomNumber } = require("../services/utils");

function fetchAdData(req, res) {
  const id = getRandomNumber();
  const trackUrl = `http://localhost:3000/ads/ad${id}.mp3`;
  const album = {
    name: "#Advertisement",
    images: [
      {
        url: `http://localhost:3000/images/ad${id}.jpeg`,
      },
    ],
  };
  res.json({ album, trackUrl, id });
}

module.exports = {
  fetchAdData,
};