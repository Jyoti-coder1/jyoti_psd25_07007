const express = require("express");
const { addMentor, deleteMentor } = require("../controllers/mentor.controller");
const router = express.Router();

router.post("/", addMentor);
router.delete("/:id", deleteMentor);

module.exports = router;