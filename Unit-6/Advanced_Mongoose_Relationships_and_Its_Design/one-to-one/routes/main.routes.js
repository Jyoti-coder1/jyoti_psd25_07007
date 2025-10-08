const express = require("express");
const router = express.Router();
const { addUser, addProfile, getProfiles } = require("../controllers/main.controller");

router.post("/add-user", addUser);
router.post("/add-profile", addProfile);
router.get("/profiles", getProfiles);

module.exports = router;