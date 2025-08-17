const express = require("express");
const router = express.Router();

const {verifyGoogleToken} = require("../controllers/oAuthApi");

router.post("/auth/google", verifyGoogleToken);

module.exports = router;
