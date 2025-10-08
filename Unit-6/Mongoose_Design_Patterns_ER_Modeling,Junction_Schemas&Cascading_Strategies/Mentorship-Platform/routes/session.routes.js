const express = require("express");
const { addSession, getRecentSessions, getLearnersBySession, archiveSession } = require("../controllers/session.controller");
const router = express.Router();

router.post("/", addSession);
router.get("/recent", getRecentSessions);
router.get("/:id/learners", getLearnersBySession);
router.patch("/archive/:id", archiveSession);

module.exports = router;