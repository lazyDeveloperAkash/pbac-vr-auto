// routes/officeRoutes.js
const express = require("express");
const { createOffice, getAllOffices, updateOffice, deleteOffice } = require("../controllers/officeController");
const checkPermission = require("../middlewares/checkPermission");
const isAuthenticated = require("../middlewares/auth");
const router = express.Router();

router.post("/", isAuthenticated, checkPermission("Office", "Create"), createOffice);
router.get("/", isAuthenticated, checkPermission("Office", "Read"), getAllOffices);
router.put("/:id", isAuthenticated, checkPermission("Office", "Update"), updateOffice);
router.delete("/:id", isAuthenticated, checkPermission("Office", "Delete"), deleteOffice);

module.exports = router;
