const express = require("express");
const router = express.Router();

const { handleUserSignIn, handleLogout } = require("../controllers/user");

router.post("/signin", handleUserSignIn);
router.get("/logout", handleLogout);

module.exports = router;
