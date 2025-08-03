const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

function setUser(user) {
  return jwt.sign(
    {
      id: user.googleId,
      email: user.email,
      name: user.name,
    },
    JWT_SECRET,
    { expiresIn: "24h" }
  );
}

function getUser(token) {
  if (!token) return null;
  return jwt.verify(token, JWT_SECRET);
}

module.exports = {
  getUser,
  setUser,
};
