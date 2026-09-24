const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/attendance.controller");
const { protect } = require("../middleware/auth.middleware");

router.get("/", protect, ctrl.getAttendance);
router.post("/", protect, ctrl.markAttendance);
router.put("/:id", protect, ctrl.updateAttendance);

module.exports = router;
