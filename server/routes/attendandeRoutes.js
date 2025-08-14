// routes/attendanceRoutes.js
const express = require("express");
const {
  createAttendance,
  getAllAttendance,
  updateAttendance,
  deleteAttendance,
} = require("../controllers/attendanceController");
const checkPermission = require("../middlewares/checkPermission");
const isAuthenticated = require("../middlewares/auth");
const router = express.Router();

router.post("/", isAuthenticated, checkPermission("Attendance", "Create"), createAttendance);
router.get("/", isAuthenticated, checkPermission("Attendance", "Read"), getAllAttendance);
router.put("/:id", isAuthenticated, checkPermission("Attendance", "Update"), updateAttendance);
router.delete("/:id", isAuthenticated, checkPermission("Attendance", "Delete"), deleteAttendance);

module.exports = router;
