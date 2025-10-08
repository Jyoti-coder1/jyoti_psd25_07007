const express = require("express");
const { addLearner, deleteLearner } = require("../controllers/learner.controller");
const router = express.Router();

router.post("/", addLearner);
router.delete("/:id", deleteLearner);

module.exports = router;