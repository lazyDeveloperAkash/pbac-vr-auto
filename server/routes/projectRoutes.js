// routes/projectRoutes.js
const express = require("express");
const {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const checkPermission = require("../middlewares/checkPermission");
const isAuthenticated = require("../middlewares/auth");

const router = express.Router();

router.post("/", isAuthenticated, checkPermission("Project", "Create"), createProject);
router.get("/", isAuthenticated, checkPermission("Project", "Read"), getAllProjects);
router.put("/:id", isAuthenticated, checkPermission("Project", "Update"), updateProject);
router.delete("/:id", isAuthenticated, checkPermission("Project", "Delete"), deleteProject);

module.exports = router;
