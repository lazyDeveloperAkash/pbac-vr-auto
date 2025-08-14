const Leave = require("../models/Leave");
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");

// CREATE Leave Request
exports.createLeave = catchAsyncErrors(async (req, res, next) => {
  const leave = await Leave.create(req.body);

  res.status(201).json({
    success: true,
    leave,
  });
});

// READ All Leave Requests
exports.getAllLeaves = catchAsyncErrors(async (req, res, next) => {
  const leaves = await Leave.find()
    .populate("employee", "name email")
    .populate("approvedBy", "name email");

  res.status(200).json({
    success: true,
    count: leaves.length,
    leaves,
  });
});

// READ Leave by ID
exports.getLeaveById = catchAsyncErrors(async (req, res, next) => {
  const leave = await Leave.findById(req.params.id)
    .populate("employee", "name email")
    .populate("approvedBy", "name email");

  if (!leave) {
    return next(new ErrorHandler("Leave request not found", 404));
  }

  res.status(200).json({
    success: true,
    leave,
  });
});

// UPDATE Leave (for status change or correction)
exports.updateLeave = catchAsyncErrors(async (req, res, next) => {
  let leave = await Leave.findById(req.params.id);

  if (!leave) {
    return next(new ErrorHandler("Leave request not found", 404));
  }

  leave = await Leave.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    leave,
  });
});

// DELETE Leave
exports.deleteLeave = catchAsyncErrors(async (req, res, next) => {
  const leave = await Leave.findById(req.params.id);

  if (!leave) {
    return next(new ErrorHandler("Leave request not found", 404));
  }

  await leave.remove();

  res.status(200).json({
    success: true,
    message: "Leave request deleted successfully",
  });
});
