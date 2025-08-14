// routes/leaveRoutes.js
const { Router } = require("express");
const {
  createLeave,
  getAllLeaves,
  updateLeave,
  deleteLeave,
} = require("../controllers/leaveController");
const checkPermission = require("../middlewares/checkPermission");
const isAuthenticated = require("../middlewares/auth");

const router = Router();

router.post("/", isAuthenticated, checkPermission("Leave", "Create"), createLeave);
router.get("/", isAuthenticated, checkPermission("Leave", "Read"), getAllLeaves);
router.put("/:id", isAuthenticated, checkPermission("Leave", "Update"), updateLeave);
router.delete("/:id", isAuthenticated, checkPermission("Leave", "Delete"), deleteLeave);

module.exports = router;
