const { Router } = require("express");

const router = Router();

router.use("/auth", require("./authRoutes"));

router.use("/attendance", require("./attendandeRoutes"));

router.use("/leave", require("./leaveRoutes"));

router.use("/office", require("./officeRoutes"));

router.use("/project", require("./projectRoutes"));

router.use("/task", require("./taskRoutes"));

router.use("/user", require("./userRoutes"));

module.exports = router;
