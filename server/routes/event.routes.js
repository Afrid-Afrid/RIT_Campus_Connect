const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/event.controller");
const { protect, requireAdmin } = require("../middleware/auth.middleware");

router.get("/", protect, ctrl.getEvents);
router.post("/", protect, requireAdmin, ctrl.createEvent);
router.put("/:id", protect, requireAdmin, ctrl.updateEvent);
router.delete("/:id", protect, requireAdmin, ctrl.deleteEvent);
router.post("/:id/register", protect, ctrl.registerForEvent);
router.post("/:id/cancel", protect, ctrl.cancelRegistration);

module.exports = router;
