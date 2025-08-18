const Project = require("../models/Project");
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");

// CREATE Project
exports.createProject = catchAsyncErrors(async (req, res, next) => {
  const project = await Project.create(req.body);

  res.status(201).json({
    success: true,
    data: project,
  });
});

// READ All Projects
exports.getAllProjects = catchAsyncErrors(async (req, res, next) => {
  const projects = await Project.find();

  res.status(200).json({
    success: true,
    count: projects.length,
    projects,
  });
});

// READ All Office Projects
exports.getAllOfficeProjects = catchAsyncErrors(async (req, res, next) => {
  const projects = await Project.find({office: req.user.office});

  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects,
  });
});

// READ Single Project
exports.getProjectById = catchAsyncErrors(async (req, res, next) => {
  const project = await Project.findById(req.params.id)
    .populate("teamMembers.employeeId", "name email");

  if (!project) {
    return next(new ErrorHandler("Project not found", 404));
  }

  res.status(200).json({
    success: true,
    project,
  });
});

// UPDATE Project
exports.updateProject = catchAsyncErrors(async (req, res, next) => {
  let project = await Project.findById(req.params.id);

  if (!project) {
    return next(new ErrorHandler("Project not found", 404));
  }

  project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    data: project,
  });
});

// DELETE Project
exports.deleteProject = catchAsyncErrors(async (req, res, next) => {
  const project = await Project.findByIdAndDelete(req.params.id);

  if (!project) {
    return next(new ErrorHandler("Project not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Project deleted successfully",
  });
});
