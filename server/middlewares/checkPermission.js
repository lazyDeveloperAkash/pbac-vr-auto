// middleware/checkPermission.js
const Permission = require("../models/Permission");

const checkPermission = (module, action) => {
  return async (req, res, next) => {
    try {
      // If user is admin, always allow
      if (req.user.role === "ADMIN") {
        return next();
      }

      const userId = req.user.id; // better to use _id since it's from MongoDB
      const officeId = req.user.office;

      const permission = await Permission.findOne({
        user: userId,
        office: officeId,
        module,
      });

      if (!permission || !permission[`can${action}`]) {
        return res.status(403).json({
          success: false,
          message: `You don't have ${action} permission on ${module}`,
        });
      }

      next();
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };
};

module.exports = checkPermission;
