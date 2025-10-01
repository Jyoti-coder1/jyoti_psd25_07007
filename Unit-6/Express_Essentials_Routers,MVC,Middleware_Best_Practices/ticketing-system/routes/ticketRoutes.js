const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/ticketController");
const dataCheckMiddleware = require("../middlewares/dataCheckMiddleware");

router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getById);
router.post("/", dataCheckMiddleware, ctrl.create);
router.put("/:id", ctrl.update);
router.delete("/:id", ctrl.remove);
router.patch("/:id/resolve", ctrl.resolve);

module.exports = router;