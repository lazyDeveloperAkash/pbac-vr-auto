const Attendance = require("../models/Attendance");
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");

// CREATE Attendance
exports.createAttendance = catchAsyncErrors(async (req, res, next) => {
  let attendance = await Attendance.create(req.body);
  attendance = await attendance.populate("employee", "name");
  res.status(201).json({
    success: true,
    data: attendance,
  });
});

// READ All Attendance
exports.getAllAttendance = catchAsyncErrors(async (req, res, next) => {
  const attendance = await Attendance.find().populate("employee", "name");
  res.status(200).json({
    success: true,
    count: attendance.length,
    attendance,
  });
});

// READ Attendance by ID
exports.getAttendanceById = catchAsyncErrors(async (req, res, next) => {
  const attendance = await Attendance.findById(req.params.id).populate(
    "employee"
  );

  if (!attendance) {
    return next(new ErrorHandler("Attendance record not found", 404));
  }

  res.status(200).json({
    success: true,
    data: attendance,
  });
});

// UPDATE Attendance
exports.updateAttendance = catchAsyncErrors(async (req, res, next) => {
  let attendance = await Attendance.findById(req.params.id);

  if (!attendance) {
    return next(new ErrorHandler("Attendance record not found", 404));
  }

  attendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  }).populate("employee");

  res.status(200).json({
    success: true,
    data: attendance,
  });
});

// DELETE Attendance
exports.deleteAttendance = catchAsyncErrors(async (req, res, next) => {
  const attendance = await Attendance.findByIdAndDelete(req.params.id);

  if (!attendance) {
    return next(new ErrorHandler("Attendance record not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Attendance record deleted successfully",
  });
});
