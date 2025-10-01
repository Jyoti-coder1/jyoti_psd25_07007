const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/employeeController");
const roleCheck = require("../middlewares/roleCheckMiddleware");

router.get("/", roleCheck(["admin", "hr"]), ctrl.getAll);
router.post("/", roleCheck(["admin"]), ctrl.create);
router.put("/:id", roleCheck(["admin", "hr"]), ctrl.update);
router.delete("/:id", roleCheck(["admin"]), ctrl.remove);

module.exports = router;