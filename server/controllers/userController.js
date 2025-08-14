const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const User = require("../models/User");


// Create User
exports.createUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({
    success: true,
    data: user,
  });
});

// Get All Users
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find().populate("office");
  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

// Get Single User
exports.getUserById = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate("office");

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// Update User
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// Delete User
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
