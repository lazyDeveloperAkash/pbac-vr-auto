const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Office = require("../models/Office");
const ErrorHandler = require("../utils/ErrorHandler");

// CREATE Office
exports.createOffice = catchAsyncErrors(async (req, res, next) => {
  const office = await Office.create(req.body);
  res.status(201).json({
    success: true,
    office,
  });
});

// READ all Offices
exports.getAllOffices = catchAsyncErrors(async (req, res, next) => {
  const offices = await Office.find().populate("admin employees");
  res.status(200).json({
    success: true,
    count: offices.length,
    offices,
  });
});

// READ single Office by ID
exports.getOfficeById = catchAsyncErrors(async (req, res, next) => {
  const office = await Office.findById(req.params.id).populate("admin employees");

  if (!office) {
    return next(new ErrorHandler("Office not found", 404));
  }

  res.status(200).json({
    success: true,
    office,
  });
});

// UPDATE Office
exports.updateOffice = catchAsyncErrors(async (req, res, next) => {
  let office = await Office.findById(req.params.id);

  if (!office) {
    return next(new ErrorHandler("Office not found", 404));
  }

  office = await Office.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    office,
  });
});

// DELETE Office
exports.deleteOffice = catchAsyncErrors(async (req, res, next) => {
  const office = await Office.findById(req.params.id);

  if (!office) {
    return next(new ErrorHandler("Office not found", 404));
  }

  await office.remove();

  res.status(200).json({
    success: true,
    message: "Office deleted successfully",
  });
});
