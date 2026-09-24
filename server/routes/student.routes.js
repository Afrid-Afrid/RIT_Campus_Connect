const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/student.controller");
const { protect, requireAdmin } = require("../middleware/auth.middleware");

// Student self-service enrollment (own account only) - placed before /:id so
// "/enroll/:courseId" is never swallowed by the generic id routes.
router.post("/enroll/:courseId", protect, ctrl.enrollCourse);
router.delete("/enroll/:courseId", protect, ctrl.unenrollCourse);

router.get("/", protect, ctrl.getStudents);
router.get("/:id", protect, ctrl.getStudent);
router.post("/", protect, requireAdmin, ctrl.createStudent);
router.put("/:id", protect, requireAdmin, ctrl.updateStudent);
router.delete("/:id", protect, requireAdmin, ctrl.deleteStudent);

module.exports = router;
