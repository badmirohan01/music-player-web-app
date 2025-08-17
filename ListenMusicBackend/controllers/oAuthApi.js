const { OAuth2Client } = require("google-auth-library");
const { setUser } = require("../services/auth");
require("dotenv").config();

const users = require("../models/user");

async function verifyGoogleToken(req, res) {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
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
    console.log(payload.sub);
    const googleUser = {
      googleId: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      emailVerified: payload.email_verified,
    };

    console.log("Google user authenticated:", googleUser);

    //Database activity
    const user = await users.findOne({ email: googleUser.email });
    if (!user) {
      console.log("User not created, handle it again");
    } else {
      user.googleId = googleUser.googleId;
      await user.save();
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
}


module.exports = {
  verifyGoogleToken,
};