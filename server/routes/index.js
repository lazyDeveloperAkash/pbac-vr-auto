const { Router } = require("express");

const router = Router();

router.use("/auth", require("./authRoutes"));

router.use("/attendance", require("./attendandeRoutes"));

router.use("/leaves", require("./leaveRoutes"));

router.use("/offices", require("./officeRoutes"));

router.use("/projects", require("./projectRoutes"));

router.use("/tasks", require("./taskRoutes"));

router.use("/users", require("./userRoutes"));

router.use("/permissions", require("./permissionRoutes"));

module.exports = router;
