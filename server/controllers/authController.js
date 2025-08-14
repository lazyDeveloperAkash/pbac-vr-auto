const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const User = require("../models/User");
const { SendToken } = require("../utils/SendToken");

exports.currentUser = catchAsyncErrors(async (req, res, next) => {
  const admin = await User.findById(req.id);
  res.status(200).json(admin);
});

exports.signup = catchAsyncErrors(async (req, res, next) => {
  const user = await new User(req.body).save();
  SendToken(user, 201, res);
});

exports.signin = catchAsyncErrors(async (req, res, next) => {
  const user = await User
    .findOne({ email: req.body.email })
    .select("+password office role")
    .exec();

  if (!user) {
    return next(new ErrorHandler("User Not Found ", 500));
  }

  const isMatch = user.comparepassword(req.body.password);
  if (!isMatch) return next(new ErrorHandler("Wrong Password", 500));

  SendToken(user, 200, res);
});

exports.signout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Successfully Singout!" });
});