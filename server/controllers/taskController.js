const Task = require("../models/Task");
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");

// CREATE Task
exports.createTask = catchAsyncErrors(async (req, res, next) => {
  const task = await Task.create(req.body);

  res.status(201).json({
    success: true,
    task,
  });
});

// GET All Tasks
exports.getAllTasks = catchAsyncErrors(async (req, res, next) => {
  const tasks = await Task.find()
    .populate("project", "name status")
    .populate("assignedTo", "name email");

  res.status(200).json({
    success: true,
    count: tasks.length,
    tasks,
  });
});

// GET Single Task
exports.getTaskById = catchAsyncErrors(async (req, res, next) => {
  const task = await Task.findById(req.params.id)
    .populate("project", "name status")
    .populate("assignedTo", "name email");

  if (!task) {
    return next(new ErrorHandler("Task not found", 404));
  }

  res.status(200).json({
    success: true,
    task,
  });
});

// UPDATE Task
exports.updateTask = catchAsyncErrors(async (req, res, next) => {
  let task = await Task.findById(req.params.id);

  if (!task) {
    return next(new ErrorHandler("Task not found", 404));
  }

  task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    task,
  });
});

// DELETE Task
exports.deleteTask = catchAsyncErrors(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(new ErrorHandler("Task not found", 404));
  }

  await task.remove();

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
});
