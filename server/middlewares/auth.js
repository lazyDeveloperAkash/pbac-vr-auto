const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { catchAsyncErrors } = require("./catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");

const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies[`token`] || req?.headers?.authorization?.split(" ")[1];
  if (!token) {
    return next(
      new ErrorHandler(`Please sign in to access this resource!`, 401)
    );
  }

  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(user.id);
  if (!req.user) {
    return next(new ErrorHandler(`user not found with this token`, 404));
  }
  req.user = user;
  next();
});

module.exports = isAuthenticated;
