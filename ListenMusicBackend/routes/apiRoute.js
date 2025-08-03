const express = require("express");
// const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const { setUser } = require("../services/auth");
require("dotenv").config();
const { authenticateToken } = require("../middlewares/auth");
const users = require("../models/user");

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/auth/google", async (req, res) => {
  try {
    const { credential } = req.body;
    // console.log(credential);

    if (!credential) {
      console.log("returned");
      return res.status(400).json({ error: "Google credential is required" });
    }

    // Verify the Google JWT token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    // Extract user information

    const googleUser = {
      googleId: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      emailVerified: payload.email_verified,
    };

    console.log("Google user authenticated:", googleUser);

    // Here you can save user to database if needed
    // const user = await User.findOrCreate({ googleId: googleUser.googleId, ...googleUser });
    const user = await users.findOne({ email: googleUser.email });
    if (user) {
      user.googleId = googleUser.googleId;
    } else {
      throw new Error("User not found in database");
    }
    // Generate your own JWT token
    const accessToken = setUser(googleUser);
    // console.log(`accessToken: ${accessToken}`);
    res.cookie("DTTES", accessToken, {
      expires: new Date(Date.now() + 30 * 60 * 1000),
      httpOnly: true,
      secure: true,
    });
    // Return user info and access token
    res.json({
      success: true,
      user: {
        id: googleUser.googleId,
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture,
      },
      accessToken,
    });
  } catch (error) {
    console.error("Google authentication error:", error);
    res.status(401).json({
      error: "Invalid Google token",
      details: error.message,
    });
  }
});

// router.post("/auth/logout", authenticateToken, (req, res) => {
//   // In a real app, you might want to blacklist the token
//   // or remove it from a database if you're storing active sessions

//   console.log("User logged out:", req.user.email);

//   res.json({
//     success: true,
//     message: "Logged out successfully",
//   });
// });

module.exports = router;
