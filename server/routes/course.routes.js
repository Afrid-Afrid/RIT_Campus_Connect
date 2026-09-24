const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/course.controller");
const { protect, requireAdmin } = require("../middleware/auth.middleware");

router.get("/", protect, ctrl.getCourses);
router.get("/:id", protect, ctrl.getCourse);
router.post("/", protect, requireAdmin, ctrl.createCourse);
router.put("/:id", protect, requireAdmin, ctrl.updateCourse);
router.delete("/:id", protect, requireAdmin, ctrl.deleteCourse);

module.exports = router;
