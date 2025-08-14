// routes/permissionRoutes.js
const express = require("express");
const {
  setPermission,
  getUserPermissions,
  deletePermission,
} = require("../controllers/permissionController");
const isAuthenticated = require("../middlewares/auth");

const router = express.Router();

// Only ADMIN can manage permissions
const isAdmin = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ success: false, message: "Only admin can manage permissions" });
  }
  next();
};

router.post("/", isAuthenticated, isAdmin, setPermission);                 // Assign/Update permission
router.get("/:userId", isAuthenticated, isAdmin, getUserPermissions);      // Get all permissions for a user
router.delete("/:id", isAuthenticated, isAdmin, deletePermission);         // Delete a permission record
router.post("/copy", isAuthenticated, isAdmin, copyPermissions);

module.exports = router;
