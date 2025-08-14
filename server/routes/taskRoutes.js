const express = require("express");
const { createTask, getAllTasks, updateTask, deleteTask } = require("../controllers/taskController");
const checkPermission = require("../middlewares/checkPermission");
const isAuthenticated = require("../middlewares/auth");

const router = express.Router();

router.post("/", isAuthenticated, checkPermission("Task", "Create"), createTask);
router.get("/", isAuthenticated, checkPermission("Task", "Read"), getAllTasks);
router.put("/:id", isAuthenticated, checkPermission("Task", "Update"), updateTask);
router.delete("/:id", isAuthenticated, checkPermission("Task", "Delete"), deleteTask);

module.exports = router;
