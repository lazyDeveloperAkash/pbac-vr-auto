// controllers/permissionController.js
const Permission = require("../models/Permission");
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");

// Assign or Update Permission
exports.setPermission = catchAsyncErrors(async (req, res, next) => {
  const { user, office, module, canCreate, canRead, canUpdate, canDelete } = req.body;

  const permission = await Permission.findOneAndUpdate(
    { user, office, module },
    { canCreate, canRead, canUpdate, canDelete },
    { new: true, upsert: true } // update if exists, otherwise create
  );

  res.status(200).json({
    success: true,
    data: permission,
  });
});

// Get Permissions of a user
exports.getUserPermissions = catchAsyncErrors(async (req, res, next) => {
  const permissions = await Permission.find({ user: req.params.userId });
  res.status(200).json({
    success: true,
    count: permissions.length,
    data: permissions,
  });
});

// Remove permission
exports.deletePermission = catchAsyncErrors(async (req, res, next) => {
  const permission = await Permission.findByIdAndDelete(req.params.id);

  if (!permission) {
    return res.status(404).json({ success: false, message: "Permission not found" });
  }

  res.status(200).json({
    success: true,
    message: "Permission removed",
  });
});

// Copy permissions from one user to another
exports.copyPermissions = catchAsyncErrors(async (req, res, next) => {
  const { fromUserId, toUserId, officeId } = req.body;

  // Get source user permissions
  const sourcePermissions = await Permission.find({ user: fromUserId, office: officeId });
  if (sourcePermissions.length === 0) {
    return res.status(404).json({ success: false, message: "Source user has no permissions" });
  }

  // Delete old permissions of target user (optional, to avoid duplicates)
  await Permission.deleteMany({ user: toUserId, office: officeId });

  // Prepare new permissions for target user
  const newPermissions = sourcePermissions.map((perm) => ({
    user: toUserId,
    office: perm.office,
    module: perm.module,
    canCreate: perm.canCreate,
    canRead: perm.canRead,
    canUpdate: perm.canUpdate,
    canDelete: perm.canDelete,
  }));

  // Insert in bulk
  await Permission.insertMany(newPermissions);

  res.status(200).json({
    success: true,
    message: "Permissions copied successfully",
    data: newPermissions,
  });
});
