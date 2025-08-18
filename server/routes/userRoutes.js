// routes/userRoutes.js
const express = require("express");
const { createUser, getAllUser, updateUser, deleteUser, searchAllUser } = require("../controllers/userController");
const checkPermission = require("../middlewares/checkPermission");
const isAuthenticated = require("../middlewares/auth");
const router = express.Router();

router.post("/", isAuthenticated, checkPermission("User", "Create"), createUser);
router.get("/", isAuthenticated, checkPermission("User", "Read"), getAllUser);
router.put("/:id", isAuthenticated, checkPermission("User", "Update"), updateUser);
router.delete("/:id", isAuthenticated, checkPermission("User", "Delete"), deleteUser);

router.get("/search/:employeeName", isAuthenticated, searchAllUser);

module.exports = router;
