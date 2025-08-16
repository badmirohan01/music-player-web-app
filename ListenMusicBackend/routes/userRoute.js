const express = require("express");
const router = express.Router();

const { setUser } = require("../services/auth");
const { getISTTime, getAdFreeTime } = require("../services/utils");
const users = require("../models/user");

router.post("/signin", async (req, res) => {
  try {
    const { username, email } = req.body;
    console.log(username, email);
    let user = await users.findOne({ email });
    if (!user) {
      user = await users.create({
        username: username,
        email: email,
        loginCount: 1,
        loginTime: getISTTime(),
      });
      // console.log("User not created check the apiRoute");
      // console.log(user);
    } else {
      user.username = username;
      user.email = email;
      user.loginCount += 1;
      // user.timeDifferenceMs = getISTTime() - user.loginTime;
      user.timeDifferenceMs = getAdFreeTime(user.loginTime);
      user.loginTime = getISTTime();
      user.loginCount % 2 === 0
        ? (user.adFreeTime = true)
        : (user.adFreeTime = false);
      await user.save();
    }
    // const token = await setUser(user);
    // res.cookie("newToken", token);
    res.status(200).json({ msg: "User signed in successfully", user });
  } catch (error) {
    console.log(error);
  }
});

router.get("/logout", async (req, res) => {
  try {
    const { username, email } = req.body;
    // console.log(username, email);
    let user = await users.findOne({ email });
    if (!user) {
      return res.json({ msg: "User not found" });
    }
    user.timeDifferenceMs = getISTTime() - user.loginTime;
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error logging out" });
  }
});

module.exports = router;
